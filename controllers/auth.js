const {db, Timestamp, FieldValue} = require("../config/index");
const cloudinary = require('cloudinary').v2;
const path = require("path");


cloudinary.config({ 
    cloud_name: 'dr4hmtpan', 
    api_key: '713233153291129', 
    api_secret: 'SB8QKAevN9AwOnW5mzPP128n_CE' 
  });
const signup = async (req, res, next)=> {
    try {
const {name, email, myfriends, password}  =req.body;

const doc = await db.collection ("friends").add({ name, email,password, myfriends, createdAt:Timestamp.fromDate(new Date()),
});
const userRef = db.collection("friends").doc(doc.id);
const doc2 = await userRef.get();
if (!doc2.exists) {
    return res.status(201).json({message:"no data"})
} else {
    return res.status(201).json({message:"data stored", data: doc2.data()});
}
 } catch (error) {
        next(error);
 }
    };

    const upload_file = async(req, res, next) =>{
        try{
            if (!req.file.path) return res.status(400).json({message:"file upload failed try again"});
            console.log(req.file.path);
            const hostname = req.get("host");
            const filepath = req.file.path.replace(new RegExp("\\b" + "public" + "\\b", "gi"), "").trim();
            const data = `$(hostname)$(filepath)`;
            const result =  await cloudinary.uploader.upload(req.file.path);
            console.log(result);
            return res.status(200).json({message:"fileuploaded successfully", result});
        } catch(error){
            console.log(error);
        }
    };

    
module.exports = {
    signup,
    upload_file,
    
};