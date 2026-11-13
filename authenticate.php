<?php
declare(strict_types=1);

require_once __DIR__ . '/auth-response.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST');
    render_auth_response('Sign in required', 'Submit the sign-in form to continue.', 405, 'login.html', 'Return to sign in');
    exit;
}

$registrationNumber = $_POST['registration_number'] ?? '';
$password = $_POST['password'] ?? '';

if (!is_string($registrationNumber) || !is_string($password) || trim($registrationNumber) === '' || $password === '') {
    render_auth_response('Sign in failed', 'Check your registration number and password and try again.', 400, 'login.html', 'Try again');
    exit;
}

try {
    require_once __DIR__ . '/db.php';
    $query = database_connection()->prepare(
        'SELECT student_id, full_name, registration_number, course, password_hash
         FROM students
         WHERE registration_number = :registration_number
         LIMIT 1'
    );
    $query->execute(['registration_number' => trim($registrationNumber)]);
    $student = $query->fetch();

    if (!$student || !password_verify($password, $student['password_hash'])) {
        render_auth_response('Sign in failed', 'Check your registration number and password and try again.', 401, 'login.html', 'Try again');
        exit;
    }

    ini_set('session.use_strict_mode', '1');
    session_set_cookie_params([
        'httponly' => true,
        'secure' => isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off',
        'samesite' => 'Lax',
    ]);
    session_start();
    session_regenerate_id(true);
    $_SESSION['student_id'] = (int) $student['student_id'];

    render_auth_response(
        'You are signed in',
        'Welcome, ' . $student['full_name'] . '.',
        200,
        'application.html',
        'Continue to application',
        $student
    );
} catch (Throwable $error) {
    error_log('Student sign-in failed: ' . $error->getMessage());
    render_auth_response('Sign in unavailable', 'The student portal is temporarily unavailable. Please try again later.', 503, 'login.html', 'Return to sign in');
}
