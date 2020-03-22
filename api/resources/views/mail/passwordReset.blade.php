<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
    </head>
    <body>
        <div class="email" style="max-width: 600px;margin: 16px auto 0;font-family: sans-serif;border: 1px solid #DDD;">
            <div class="email__content" style="padding: 32px 16px;">
                <img class="badge" src="{{asset('static/images/ft-badge.svg')}}" style="margin: 0 auto 32px;width: 48px;display: block;">
                <p>Hello {{$name}},</p>
                <p>We understand you're unable to access your account. Sorry about that! Here is your password reset code:</p>
                <h2 class="code" style="font-family: monospace;text-align: center;">{{$code}}</h2>
                <p>If you received this email in error, you can safely ignore it.</p>
                <p>Thanks,<br>the Focustime Support Team</p>
            </div>
            <div class="footer" style="background: #CCC;color: #FFF;padding: 16px;">
                <div class="footer__inner">
                    <img class="logo" src="{{asset('static/images/ft-logo-white.png')}}" style="height: 48px;">
                    <p class="copyright" style="font-size: 12px;margin-bottom: 0;text-align: center;">© 2019 Focustime Technologies</p>
                </div>
            </div>
        </div>
    </body>
</html>
