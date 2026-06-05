const style = `
<style>
body {
    margin: 0;
    font-family: "Segoe UI", Arial, sans-serif;
    background: linear-gradient(135deg, #e9f0ff, #f7f9fc);
}

/* Top navbar */
.navbar {
    background: #1f4aa8;
    color: white;
    padding: 15px 25px;
    font-size: 18px;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
}

/* Container card */
.container {
    width: 70%;
    margin: 50px auto;
    background: white;
    padding: 30px;
    border-radius: 15px;
    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
}

/* Headings */
h1, h2 {
    color: #1f2d3d;
}

/* Buttons */
button {
    background: #1f4aa8;
    color: white;
    padding: 12px 18px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: 0.3s;
}

button:hover {
    background: #163a82;
}

/* Links */
a {
    text-decoration: none;
    color: #1f4aa8;
    font-weight: 500;
}

/* File list cards */
.file-card {
    background: #f8faff;
    border: 1px solid #e3e8f5;
    padding: 15px;
    margin: 10px 0;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.file-card:hover {
    background: #eef4ff;
}

/* Upload box */
.upload-box {
    border: 2px dashed #1f4aa8;
    padding: 30px;
    text-align: center;
    border-radius: 12px;
    background: #f9fbff;
}

input[type="file"] {
    margin-top: 15px;
}
</style>
`;

/* HOME PAGE */
const homePage = () => `
${style}
<div class="navbar">
    ☁ AWS Cloud Storage System
    <span>EC2 + S3 + DynamoDB + Networking + IAM</span>
</div>

<div class="container">
    <h1>Welcome 👋</h1>
    <p>Secure file storage powered by AWS cloud services</p>

    <br>

    <a href="/upload">
        <button>📤 Upload Files</button>
    </a>

    <a href="/files">
        <button>📁 View Files</button>
    </a>
</div>
`;

/* UPLOAD PAGE */
const uploadPage = () => `
${style}
<div class="navbar">
    ☁ Upload Center
</div>

<div class="container">
    <h2>Upload Your File</h2>

    <div class="upload-box">
        <form action="/upload" method="POST" enctype="multipart/form-data">
            <p>Drag & Drop or Choose File</p>
            <input type="file" name="file" required />
            <br><br>
            <button type="submit">Upload Now</button>
        </form>
    </div>

    <br>
    <a href="/">⬅ Back Home</a>
</div>
`;

/* FILES PAGE */
const filesPage = (files) => `
${style}
<div class="navbar">
    ☁ Your Files
</div>

<div class="container">
    <h2>Uploaded Files</h2>

    ${
        files.length === 0
        ? "<p>No files uploaded yet.</p>"
        : files.map(f => `
            <div class="file-card">
           	<div>
        	   📄 ${f.fileName}
        	   <br>
        	   <small>${f.uploadDate}</small>
    	        </div>

    		<div>
        	   <a href="${f.fileUrl}" target="_blank">Open</a>
        	   <br>
       	    	   <a href="/delete/${f.fileId}" style="color:red;">
               	   Delete
       	        </a>
    	        </div>
	    </div>
        `).join("")
    }

    <br>
    <a href="/">⬅ Back Home</a>
</div>
`;

const uploadSuccessPage = (fileName, fileUrl) => `
<style>
body {
    font-family: Arial;
    background: linear-gradient(135deg, #e9f0ff, #f7f9fc);
    text-align: center;
    padding-top: 80px;
}

.card {
    background: white;
    width: 420px;
    margin: auto;
    padding: 30px;
    border-radius: 15px;
    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
}

h2 {
    color: #2ecc71;
}

a {
    display: inline-block;
    margin-top: 10px;
    text-decoration: none;
    color: #1f4aa8;
    font-weight: bold;
}

.btn {
    display: inline-block;
    margin-top: 15px;
    padding: 10px 15px;
    background: #1f4aa8;
    color: white;
    border-radius: 8px;
    text-decoration: none;
}

.btn:hover {
    background: #163a82;
}
</style>

<div class="card">
    <h2>Upload Successful ✅</h2>

    <p><b>File:</b> ${fileName}</p>

    <a href="${fileUrl}" target="_blank">🔗 Open File</a>
    <br>

    <a class="btn" href="/files">View Files</a>
    <br>

    <a href="/">Back Home</a>
</div>
`;

module.exports = {
    homePage,
    uploadPage,
    filesPage,
    uploadSuccessPage
};
