const express = require("express");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

const { s3, dynamoDB } = require("./aws");
const ui = require("./ui");
const config = require("./config");

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

/* ================= HOME ================= */
router.get("/", (req, res) => {
    res.send(ui.homePage());
});

/* ================= UPLOAD PAGE ================= */
router.get("/upload", (req, res) => {
    res.send(ui.uploadPage());
});

/* ================= UPLOAD FILE ================= */
router.post("/upload", upload.single("file"), async (req, res) => {
    try {
        const file = req.file;

        const fileId = uuidv4();
        const s3Key = fileId + "-" + file.originalname;

        const uploadResult = await s3.upload({
            Bucket: config.BUCKET_NAME,
            Key: s3Key,
            Body: file.buffer,
            ContentType: file.mimetype
        }).promise();

        const item = {
            userId: "USER1",
            fileId: fileId,
            fileName: file.originalname,
            fileUrl: uploadResult.Location,
            s3Key: s3Key,   // ✅ MUST BE STORED
            uploadDate: new Date().toISOString()
        };

        console.log("DEBUG ITEM:", item); // 🔥 IMPORTANT CHECK

        await dynamoDB.put({
            TableName: config.TABLE_NAME,
            Item: item
        }).promise();

        res.send(ui.uploadSuccessPage(file.originalname, uploadResult.Location));

    } catch (err) {
        res.send("Upload Failed ❌ " + err.message);
    }
});

/* ================= FILE LIST ================= */
router.get("/files", async (req, res) => {
    try {
        const data = await dynamoDB.scan({
            TableName: config.TABLE_NAME
        }).promise();

        res.send(ui.filesPage(data.Items));

    } catch (err) {
        res.send("Error: " + err.message);
    }
});

/* ================= DELETE FILE (FIXED) ================= */
router.get("/delete/:fileId", async (req, res) => {
    try {
        const fileId = req.params.fileId;

        const data = await dynamoDB.scan({
            TableName: config.TABLE_NAME
        }).promise();

        const file = data.Items.find(f => f.fileId === fileId);

        if (!file) {
            return res.send("File not found ❌");
        }

        if (!file.s3Key) {
            return res.send("Missing S3 Key ❌");
        }

        // Delete from S3
        await s3.deleteObject({
            Bucket: config.BUCKET_NAME,
            Key: file.s3Key
        }).promise();

        // Delete from DynamoDB
        await dynamoDB.delete({
            TableName: config.TABLE_NAME,
            Key: {
                userId: file.userId,
                fileId: file.fileId
            }
        }).promise();

        res.redirect("/files");

    } catch (err) {
        res.send("Delete Failed ❌ " + err.message);
    }
});

module.exports = router;
