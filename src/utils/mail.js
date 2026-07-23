import Mailgen from 'mailgen'

const emailVerificationMailgenContent= (username,verificationUrl) =>{
    return {
        body: {
            name: username,
            intro: "Welcome to our App! we're excited o have you on board.",
            action: {
                instructions:"To Verify your email please click on the following button",
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

const forgotPasswordMailgenContent= (username,passwordResetUrl) =>{
    return {
        body: {
            name: username,
            intro: "We got a request to reset the password of your account",
            action: {
                instructions:"To Reset your password click on the following button",
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
    forgotPasswordMailgenContent
};