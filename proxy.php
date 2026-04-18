<?php

$env = parse_ini_file(__DIR__ . '/.env');
$token = $env['TMDB_TOKEN'] ?? '';

if (empty($token)) {
    http_response_code(500);
    echo json_encode(['error' => ' le Token TMDB est  manquant ']);
    exit;
}   

define('TMDB_BASE_URL', 'https://api.themoviedb.org/3');

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$endpoint = $_GET['endpoint'] ?? '';

if (empty($endpoint) || $endpoint[0] !== '/') {
    http_response_code(400);
    echo json_encode(['error' => ' l\'Endpoint  est invalide']);
    exit;
}

$url = TMDB_BASE_URL . $endpoint;

$context = stream_context_create([
    'http' => [
        'header' => "Authorization: Bearer " . $token . "\r\n" .
                    "Content-Type: application/json\r\n"
    ]
]);

$response = file_get_contents($url, false, $context);

if ($response === false) {
    http_response_code(502);
    echo json_encode(['error' => ' Erreur lors de la communication avec TMDB']);
    exit;
}

echo $response;
