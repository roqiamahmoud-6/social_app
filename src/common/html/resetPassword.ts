export const resetPasswordTemplate = (otp: string) => {
return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Reset Password</title>
    </head>
    <body style="margin:0; padding:0; background-color:#f4f4f7; font-family:Arial,sans-serif;">

      <div style="max-width:500px; margin:40px auto; background:#ffffff; border-radius:12px; overflow:hidden;">

        <div style="background:#6c63ff; padding:25px; text-align:center; color:white;">
          <h1 style="margin:0;">Social App</h1>
        </div>

        <div style="padding:30px; text-align:center; color:#333333;">
          <h2>Reset Your Password</h2>

          <p style="font-size:15px; line-height:1.6; color:#666666;">
            We received a request to reset your password.
            Use the verification code below to continue.
          </p>

          <div style="margin:25px 0; padding:15px; background:#f0efff; border-radius:8px;">
            <h1 style="margin:0; color:#6c63ff; letter-spacing:8px;">
              ${otp}
            </h1>
          </div>

          <p style="font-size:14px; color:#666666;">
            This code expires in 10 minutes.
          </p>

          <p style="font-size:13px; color:#888888; line-height:1.6;">
            If you didn't request a password reset, please ignore this email
            and keep your account secure.
          </p>
        </div>

        <div style="padding:15px; text-align:center; background:#f9f9fb; color:#999999; font-size:12px;">
          &copy; 2026 Social App. All rights reserved.
        </div>

      </div>
    </body>
    </html>
  `;
}