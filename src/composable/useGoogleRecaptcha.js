export default function useGoogleRecaptcha() {
    let link =
        'https://www.google.com/recaptcha/api.js?render=6Ld0LU0pAAAAAG1DfvNrfrJBkbQH4_MJ_OkcwQV_';
    function loadRecaptcha() {
        let recaptchaScript = document.createElement('script');
        recaptchaScript.setAttribute('src', link);
        document.head.appendChild(recaptchaScript);
    }

    function removeRecaptcha() {
        let script = document.querySelectorAll(`script[src='${link}']`);
        if (script.length > 0) {
            script[0].remove();
            document
                .querySelectorAll('.grecaptcha-badge')
                .forEach(el => el.remove());
        }
    }
    return {
        loadRecaptcha,
        removeRecaptcha,
    };
}
