import Mailgen from 'mailgen'
import nodemailer from 'nodemailer'

const sendEmail = async (options) => {
    const mailGenerator = new Mailgen({
        theme: "default",
        product: {
            name: "Task Manager",
            link: "https://taskmanagelink.com"
        }
    })

    const emailTextual = mailGenerator.generatePlaintext(options.mailgenContent)
    const emailHtml = mailGenerator.generate(options.mailgenContent)

    const trasporter = nodemailer.createTransport({
        host: process.env.MAIL_TRAP_SMTP_HOST,
        port: process.env.MAIL_TRAP_SMTP_PORT,
        auth: {
            user: process.env.MAIL_TRAP_SMTP_USER,
            pass: process.env.MAIL_TRAP_SMTP_PASS
        }
    })

    const mail = {
        from: "mail.taskmanager@example.com",
        to: options.email,
        subject: options.subject,
        text: emailTextual,
        html: emailHtml
    }


    try {
        await trasporter.sendMail(mail)
    } catch (error) {
        console.log("Emqail service Failled silently. Make sure that you have provided your mailtrap credentials in the .env file");
        console.log("Error: ", error)
    }
}

const emailVerificationMailgenContent = (username, verificationUrl) => {
    return {
        body: {
            name: username,
            intro: "Welcome to our App! we're excited o have you on board.",
            action: {
                instructions: "To Verify your email please click on the following button",
                button: {
                    color: "#5970f6",
                    text: "Verify your Email",
                    link: verificationUrl
                }
            },
            outro: "Need help, or have questions? Just reply to this email, we'd love to help."
        }
    }
};

const forgotPasswordMailgenContent = (username, passwordResetUrl) => {
    return {
        body: {
            name: username,
            intro: "We got a request to reset the password of your account",
            action: {
                instructions: "To Reset your password click on the following button",
                button: {
                    color: "#4ecf50",
                    text: "Reset Password",
                    link: passwordResetUrl
                }
            },
            outro: "Need help, or have questions? Just reply to this email, we'd love to help."
        }
    }
};

export {
    emailVerificationMailgenContent,
    forgotPasswordMailgenContent,
    sendEmail
}; 