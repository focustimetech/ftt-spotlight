<?php
    $manifest = json_decode(file_get_contents('js/manifest.json'), true);
    $bundle_path = $manifest['main.js'];
    // dd($bundle_path);
?>

<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8" />
        <title>Spotlight - Smart Attendance</title>
    </head>
    <body>
        <div id="app-root"></div>
        <!-- Dependencies -->
        <script src="{{ asset('js/react.development.js') }}"></script>
        <script src="{{ asset('js/react-dom.development.js') }}"></script>
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500">
        <!-- Main -->
        <script src="{{ asset($bundle_path) }}"></script>
    </body>
</html>