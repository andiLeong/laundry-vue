export default function useGooglePlace() {
    let link =
        'https://maps.googleapis.com/maps/api/js?key=AIzaSyCoB-tj4ET52fOi6uIbtkzBzXjecC4ZCUA&libraries=places&loading=async';

    function loadPlace() {
        let script = document.createElement('script');
        script.setAttribute('src', link);
        script.setAttribute('async', '');
        document.head.appendChild(script);
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
        loadPlace,
        removeRecaptcha,
    };
}
