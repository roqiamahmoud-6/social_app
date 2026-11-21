export const emailVerify = (otp) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Verification</title>
    </head>
    <body>

        <h2>Email Verification</h2>
        <p>Your OTP code is:</p>

        <h1>${otp}</h1>

        <p>Please use this code to verify your email.</p>

    </body>
    </html>
    `;
};
//# sourceMappingURL=emailVerify.js.map