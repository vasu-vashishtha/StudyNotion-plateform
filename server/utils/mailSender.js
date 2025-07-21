const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
    try{
            const transporter = nodemailer.createTransport({
                host:process.env.MAIL_HOST,
                port: 587, // Gmail SMTP port
                secure: false, // true for port 465, false for 587
                auth:{
                    user: process.env.MAIL_USER,
                    pass: process.env.MAIL_PASS,
                }
            })


            const info = await transporter.sendMail({
                from: 'StudyNotion || CodeHelp - by Vasu',
                to:`${email}`,
                subject: `${title}`,
                html: `${body}`,
            })
            console.log("Mail sent successfully: ", info?.response || info);
            return info;
    }
    catch(error) {
        console.error("MailSender Error:", error.message);
        throw error;
    }
}


module.exports = mailSender;