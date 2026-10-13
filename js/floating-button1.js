// Legacy copy kept in sync with js/floating-button.js.
(function () {
    const APPLY_NOW_URL = "https://stuportal.internboot.com/";
    const FOOTER_GAP = 30;
    let ticking = false;

    function getFooterElement() {
        return document.querySelector('footer') || document.getElementById('footer-container');
    }

    function getFooterProtectionTarget() {
        const footerElement = getFooterElement();

        if (!footerElement || footerElement.children.length === 0) {
            return null;
        }

        const footer = footerElement.matches('footer')
            ? footerElement
            : footerElement.querySelector('footer');

        if (!footer) {
            return footerElement;
        }

        const bottomRows = footer.querySelectorAll('.container > .row.align-items-center');
        return bottomRows.length ? bottomRows[bottomRows.length - 1] : footer;
    }

    function getBaseBottomOffset() {
        const value = getComputedStyle(document.documentElement)
            .getPropertyValue('--apply-now-bottom')
            .trim();
        const parsed = parseFloat(value);
        return Number.isFinite(parsed) ? parsed : 30;
    }

    function updateFooterClearance() {
        const floatingButton = document.querySelector('.apply-now-floating, .floating-apply-button');
        const protectionTarget = getFooterProtectionTarget();

        if (!floatingButton || !protectionTarget) {
            document.documentElement.style.setProperty('--apply-now-footer-offset', '0px');
            document.body.classList.remove('footer-in-view');
            return;
        }

        const targetRect = protectionTarget.getBoundingClientRect();
        const baseBottom = getBaseBottomOffset();
        const buttonBottomAtBase = window.innerHeight - baseBottom;
        const protectedTop = targetRect.top - FOOTER_GAP;
        const overlap = Math.max(0, buttonBottomAtBase - protectedTop);

        document.documentElement.style.setProperty('--apply-now-footer-offset', `${overlap}px`);
        document.body.classList.toggle('footer-in-view', overlap > 0);
    }

    function requestFooterClearanceUpdate() {
        if (ticking) {
            return;
        }

        ticking = true;
        window.requestAnimationFrame(() => {
            updateFooterClearance();
            ticking = false;
        });
    }

    function createOrUpdateButton() {
        let floatingButton = document.querySelector('.apply-now-floating, .floating-apply-button');

        if (!floatingButton) {
            floatingButton = document.createElement('a');
            document.body.appendChild(floatingButton);
        }

        floatingButton.href = APPLY_NOW_URL;
        floatingButton.classList.add('apply-now-floating', 'floating-apply-button');
        floatingButton.setAttribute('aria-label', 'Apply Now');
        floatingButton.innerHTML = '<i class="fas fa-paper-plane" aria-hidden="true"></i> Apply Now';

        updateFooterClearance();
    }

    function initFloatingApplyButton() {
        createOrUpdateButton();

        window.addEventListener('scroll', requestFooterClearanceUpdate, { passive: true });
        window.addEventListener('resize', requestFooterClearanceUpdate);
        window.addEventListener('load', requestFooterClearanceUpdate);

        const footerContainer = document.getElementById('footer-container');
        if (footerContainer && 'MutationObserver' in window) {
            new MutationObserver(requestFooterClearanceUpdate).observe(footerContainer, {
                childList: true,
                subtree: true
            });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initFloatingApplyButton);
    } else {
        initFloatingApplyButton();
    }
})();
