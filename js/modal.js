function ensureAppModal() {
    let modal = document.getElementById('app-modal');
    if (modal) return modal;

    modal = document.createElement('div');
    modal.id = 'app-modal';
    modal.className = 'app-modal';
    modal.innerHTML = `
        <div class="app-modal-backdrop" data-modal-close></div>
        <section class="app-modal-panel" role="dialog" aria-modal="true" aria-labelledby="app-modal-title">
            <div class="app-modal-icon" id="app-modal-icon">!</div>
            <div class="app-modal-copy">
                <h3 id="app-modal-title">Linux Quest</h3>
                <p id="app-modal-message"></p>
            </div>
            <div class="app-modal-actions" id="app-modal-actions"></div>
        </section>
    `;
    document.body.appendChild(modal);
    return modal;
}

function showAppModal({
    title = 'Linux Quest',
    message = '',
    icon = '!',
    confirmText = 'ตกลง',
    cancelText = null,
    closeOnBackdrop = false
} = {}) {
    const modal = ensureAppModal();
    const titleEl = modal.querySelector('#app-modal-title');
    const messageEl = modal.querySelector('#app-modal-message');
    const iconEl = modal.querySelector('#app-modal-icon');
    const actionsEl = modal.querySelector('#app-modal-actions');

    titleEl.innerText = title;
    messageEl.innerText = message;
    iconEl.innerText = icon;
    actionsEl.innerHTML = '';

    return new Promise(resolve => {
        const close = result => {
            modal.classList.remove('show');
            document.body.classList.remove('modal-open');
            document.removeEventListener('keydown', onKeyDown);
            resolve(result);
        };

        const confirmBtn = document.createElement('button');
        confirmBtn.type = 'button';
        confirmBtn.className = 'btn btn-primary';
        confirmBtn.innerText = confirmText;
        confirmBtn.addEventListener('click', () => close(true));

        if (cancelText) {
            const cancelBtn = document.createElement('button');
            cancelBtn.type = 'button';
            cancelBtn.className = 'btn btn-secondary';
            cancelBtn.innerText = cancelText;
            cancelBtn.addEventListener('click', () => close(false));
            actionsEl.appendChild(cancelBtn);
        }

        actionsEl.appendChild(confirmBtn);

        const backdrop = modal.querySelector('[data-modal-close]');
        backdrop.onclick = () => {
            if (closeOnBackdrop) close(false);
        };

        const onKeyDown = event => {
            if (event.key === 'Escape' && (cancelText || closeOnBackdrop)) {
                close(false);
            }
            if (event.key === 'Enter') {
                close(true);
            }
        };

        document.addEventListener('keydown', onKeyDown);
        document.body.classList.add('modal-open');
        modal.classList.add('show');
        confirmBtn.focus();
    });
}

function showAppAlert(message, options = {}) {
    return showAppModal({
        title: options.title || 'แจ้งเตือน',
        message,
        icon: options.icon || '✓',
        confirmText: options.confirmText || 'ตกลง'
    });
}

function showAppConfirm(message, options = {}) {
    return showAppModal({
        title: options.title || 'ยืนยัน',
        message,
        icon: options.icon || '!',
        confirmText: options.confirmText || 'ยืนยัน',
        cancelText: options.cancelText || 'ยกเลิก',
        closeOnBackdrop: true
    });
}
