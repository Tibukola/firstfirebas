const multer= require ("multer");
const fs= require ("fs");
const path = require("path");

// const nodemailer = require("nodemailer");

// const transporter= nodemailer.createTransport({
//     service:"gmail",
//     auth:{
//         user:"alegbeleyebukola42@gmail.com",
//         pass:"rrsysiasjczvhmjg",
//     },
// });
// const sendMail = async ({to, subject, message})=> {
//     // const emailPath = "../templates/reset-pwd.ejs"
//     const mailOption = {  
//         from:"alegbeleyebukola42@gmail.com",
//         to,
//         subject,
//         // html:emailPath({data:"link"}),
// };
// transporter.sendMail(mailOption, function (error, info){
// if (error) {
//     console.log(error);
// }else {
//     console.log("email was sent", info);
// }
// });
// };
// setTimeout(()=> {
//     sendMail({ to:"bukola.kolawole82@gmail.com", subject:"welcome" , message:"Time to sleep"});
// }, 3000);
// console.log("hi");

const path_to_folder = "public/image";
if(!fs.existsSync(path_to_folder)){
  fs.mkdirSync(path_to_folder);
}

const storage = multer.diskStorage({
    destination: async  function (req, file, cb) { 
      cb(null, path_to_folder);
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
      const fileExt =path.extname(file.originalname);
      cb(null, file.fieldname + "-" + uniqueSuffix +".jpeg");
    },
  });
  
const fileFilter = function(req, file, cb) {
  try{
  const allowedFileExtensions = [".jpg", ".jpeg", ".png"];
  const fileExt =path.extname(file.originalname);
  if (allowedFileExtensions.includes(fileExt)){
    cb(null, true);
  }else{
    cb(new Error("invalid file extension"));
  }
}catch(error){
 console.log(error);
  }
};

  const upload = multer({ storage: storage, fileFilter:fileFilter });

 module.exports = { upload};

