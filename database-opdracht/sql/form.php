<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]>      <html class="no-js"> <!--<![endif]-->
// IK KON NIET IN DE CODING OMGEVING, DUS DAAROM LEVER IK HET VIA GITHUB IN
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title></title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="index.css">
    </head>
    <body>
        <div id="container">
            <h1>Neem de test nu:</h1>
            <button>klik hier</button>
        </div>
        <div id="overlay">
            <div id="overlay-content">
                <button id="close-btn">✕</button>
                <div id="success-msg" style="display:none; text-align:center; padding: 40px 0;">
                    <h2>✓ Verstuurd!</h2>
                    <p>Bedankt voor uw inzending.</p>
                </div>
                <form id="test-form">
                    <h1>Technische informatie</h1>
                    <h2>Vul de test in</h2>
                    <div class="form-group">
                        <label for="name">Naam</label>
                        <input type="text" id="name" name="name" placeholder="Uw naam..." required>
                    </div>
                    <div class="form-group">
                        <label for="email">E-mail</label>
                        <input type="email" id="email" name="email" placeholder="Uw e-mail..." required>
                    </div>
                    <div class="form-group">
                        <label for="school">School / Werk</label>
                        <input type="text" id="school" name="school" placeholder="Wat is uw favoriete deel van uw school, of werk?">
                    </div>
                    <div class="form-group">
                        <label for="opleiding">Opleiding</label>
                        <input type="text" id="opleiding" name="opleiding" placeholder="Wat heeft u gestudeerd, en waarom?">
                    </div>
                    <div class="form-group">
                        <label for="hobbys">Hobby's</label>
                        <input type="text" id="hobbys" name="hobbys" placeholder="Wat zijn uw hobby's?">
                    </div>
                    <div class="form-group">
                        <label for="message">Opmerkingen</label>
                        <textarea id="message" name="message" rows="4" placeholder="Vond je het niet geweldig om deze form in te vullen?"></textarea>
                    </div>
                    <button type="submit">Versturen</button>
                </form>
            </div>
        </div>
        <script src="formscript.js"></script>
    </body>
</html>