export default function NoWeather({ zip }) {
    return (
        <>
            <div>
                Please wait while we get the weather for ZIP code {zip}
            </div>

            <div id="error"></div>
        </>
    );
}