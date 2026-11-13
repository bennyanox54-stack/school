<?php
declare(strict_types=1);

require_once __DIR__ . '/auth-response.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST');
    render_auth_response('Registration required', 'Submit the registration form to create an account.', 405, 'registration.html', 'Return to registration');
    exit;
}

function posted_string(string $key): string
{
    $value = $_POST[$key] ?? '';
    return is_string($value) ? trim($value) : '';
}

$fullName = posted_string('fullName');
$registrationNumber = posted_string('registration_number');
$email = posted_string('email');
$course = posted_string('course');
$password = $_POST['password'] ?? '';
$confirmation = $_POST['confirm_password'] ?? '';
$allowedCourses = ['Computer Science', 'Business Management', 'Engineering'];

if (
    $fullName === '' || strlen($fullName) > 150 ||
    $registrationNumber === '' || strlen($registrationNumber) > 50 ||
    !filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($email) > 254 ||
    !in_array($course, $allowedCourses, true) ||
    !is_string($password) || !is_string($confirmation) || $password !== $confirmation ||
    strlen($password) < 8 ||
    !preg_match('/[a-z]/', $password) ||
    !preg_match('/[A-Z]/', $password) ||
    !preg_match('/[0-9]/', $password)
) {
    render_auth_response('Registration could not be completed', 'Check the information and password requirements, then try again.', 400, 'registration.html', 'Return to registration');
    exit;
}

try {
    require_once __DIR__ . '/db.php';
    $insert = database_connection()->prepare(
        'INSERT INTO students (full_name, email, registration_number, course, password_hash)
         VALUES (:full_name, :email, :registration_number, :course, :password_hash)'
    );
    $insert->execute([
        'full_name' => $fullName,
        'email' => $email,
        'registration_number' => $registrationNumber,
        'course' => $course,
        'password_hash' => password_hash($password, PASSWORD_DEFAULT),
    ]);

    render_auth_response('Account created', 'Your student account is ready. Sign in with your registration number and password.', 201, 'login.html', 'Go to sign in');
} catch (PDOException $error) {
    if ($error->getCode() === '23000') {
        render_auth_response('Account already exists', 'That email address or registration number is already registered.', 409, 'registration.html', 'Return to registration');
        exit;
    }

    error_log('Student registration failed: ' . $error->getMessage());
    render_auth_response('Registration unavailable', 'The registration service is temporarily unavailable. Please try again later.', 503, 'registration.html', 'Return to registration');
} catch (Throwable $error) {
    error_log('Student registration failed: ' . $error->getMessage());
    render_auth_response('Registration unavailable', 'The registration service is temporarily unavailable. Please try again later.', 503, 'registration.html', 'Return to registration');
}
