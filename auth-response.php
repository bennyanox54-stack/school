<?php
declare(strict_types=1);

function render_auth_response(
    string $title,
    string $message,
    int $status,
    string $primaryHref,
    string $primaryLabel,
    ?array $student = null
): void {
    http_response_code($status);
    header('Content-Type: text/html; charset=utf-8');
    ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= htmlspecialchars($title, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8') ?> | WaMUT</title>
    <link rel="stylesheet" href="style.css">
</head>
<body class="auth-page registration-page">
    <main class="auth-shell auth-shell-small">
        <section class="auth-card">
            <div class="card-header">
                <p class="eyebrow">WaMUT student portal</p>
                <h1><?= htmlspecialchars($title, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8') ?></h1>
                <p><?= htmlspecialchars($message, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8') ?></p>
            </div>
            <?php if ($student !== null): ?>
                <dl>
                    <dt>Registration number</dt>
                    <dd><?= htmlspecialchars($student['registration_number'], ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8') ?></dd>
                    <dt>Course</dt>
                    <dd><?= htmlspecialchars($student['course'], ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8') ?></dd>
                </dl>
            <?php endif; ?>
            <div class="form-actions">
                <a class="primary-btn" href="<?= htmlspecialchars($primaryHref, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8') ?>"><?= htmlspecialchars($primaryLabel, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8') ?></a>
                <a class="secondary-link" href="main website.html">Back to home</a>
            </div>
        </section>
    </main>
</body>
</html>
    <?php
}
