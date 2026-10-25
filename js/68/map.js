const GEONAMES_USERNAME = "csoro";

const [
    { Map, InfoWindow },
    { AdvancedMarkerElement }
] = await Promise.all([
    google.maps.importLibrary("maps"),
    google.maps.importLibrary("marker")
]);

const map = new Map(document.getElementById("map"), {
    zoom: 18,
    renderingType: "VECTOR",
    mapTypeId: "satellite",
    mapId: "DEMO_MAP_ID"
});
const infoWindow = new InfoWindow();

const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const resultsList = document.getElementById("results-list");
const resultsCount = document.getElementById("results-count");
const statusElement = document.getElementById("status");

const geonamesMarkers = [];

let searchRequestId = 0;

function contentForPlace(place) {
    const content = document.createElement("div");

    const heading = document.createElement("h3");
    heading.textContent = place.title || "Untitled";
    content.appendChild(heading);

    const summary = document.createElement("p");
    summary.textContent =
        place.summary || "No summary available.";
    content.appendChild(summary);

    if (place.wikipediaUrl) {
        const link = document.createElement("a");

        if (/^https?:\/\//i.test(place.wikipediaUrl)) {
            link.href = place.wikipediaUrl;
        } else {
            const articlePath =
                place.wikipediaUrl.split("/").pop();

            link.href =
                `https://${place.lang || "en"}.wikipedia.org/wiki/` +
                articlePath;
        }

        link.textContent = "Read on Wikipedia";
        link.target = "_blank";
        link.rel = "noopener noreferrer";

        content.appendChild(link);
    }

    return content;
}

function clearSearchMarkers() {
    geonamesMarkers.forEach(marker => {
        marker.map = null;
    });

    geonamesMarkers.length = 0;
}

function getPosition(place) {
    if (place.lat == null || place.lng == null) {
        return null;
    }

    const lat = Number(place.lat);
    const lng = Number(place.lng);

    if (
        !Number.isFinite(lat) ||
        !Number.isFinite(lng) ||
        lat < -90 ||
        lat > 90 ||
        lng < -180 ||
        lng > 180
    ) {
        return null;
    }

    return {
        lat,
        lng
    };
}

function createResultItem(place, position, marker) {
    const item = document.createElement("div");

    item.className = "result-item";
    item.tabIndex = 0;
    item.setAttribute("role", "button");

    const titleText = place.title || "Untitled";

    item.setAttribute(
        "aria-label",
        `Show ${titleText} on the map`
    );

    if (place.thumbnailImg) {
        const img = document.createElement("img");

        img.src = place.thumbnailImg.replace(
            /^http:/i,
            "https:"
        );

        img.alt = titleText;

        img.onerror = () => {
            img.style.display = "none";
        };

        item.appendChild(img);
    }

    const details = document.createElement("div");

    const title = document.createElement("h3");
    title.textContent = titleText;

    const summary = document.createElement("p");
    summary.textContent =
        place.summary || "No summary available.";

    details.append(title, summary);
    item.appendChild(details);

    function selectResult() {
        document
            .querySelectorAll(".result-item.active")
            .forEach(element => {
                element.classList.remove("active");
            });

        item.classList.add("active");

        map.panTo(position);
        map.setZoom(15);

        infoWindow.setContent(
            contentForPlace(place)
        );

        infoWindow.open({
            map,
            anchor: marker
        });
    }

    item.addEventListener(
        "click",
        selectResult
    );

    item.addEventListener(
        "keydown",
        event => {
            if (
                event.key === "Enter" ||
                event.key === " "
            ) {
                event.preventDefault();
                selectResult();
            }
        }
    );

    return item;
}

async function searchPlaces(query) {
    const requestId = ++searchRequestId;

    clearSearchMarkers();
    resultsList.replaceChildren();

    resultsCount.textContent = "Searching...";
    statusElement.textContent =
        "Searching GeoNames...";

    const params = new URLSearchParams({
        q: query,
        maxRows: "10",
        username: GEONAMES_USERNAME,
        type: "json"
    });

    const url =
        `https://api.geonames.org/wikipediaSearchJSON?${params}`;
    console.log("Requesting:", url);

    try {
        const response = await fetch(url);

        console.log(
            "Response:",
            response.status,
            response.statusText
        );

        if (!response.ok) {
            throw new Error(
                `HTTP error: ${response.status}`
            );
        }

        const data = await response.json();

        console.log(
            "GeoNames response:",
            data
        );

        if (requestId !== searchRequestId) {
            return;
        }

        if (!Array.isArray(data.geonames)) {
            throw new Error(
                data.status?.message ||
                "Invalid GeoNames response"
            );
        }

        const bounds =
            new google.maps.LatLngBounds();

        let validResults = 0;

        data.geonames.forEach(place => {
            const position =
                getPosition(place);

            if (!position) {
                return;
            }

            const marker =
                new AdvancedMarkerElement({
                    map,
                    position,
                    title:
                        place.title ||
                        "Untitled"
                });

            bounds.extend(position);

            marker.addListener(
                "click",
                () => {
                    infoWindow.setContent(
                        contentForPlace(place)
                    );

                    infoWindow.open({
                        map,
                        anchor: marker
                    });

                    document
                        .querySelectorAll(
                            ".result-item.active"
                        )
                        .forEach(element => {
                            element.classList.remove(
                                "active"
                            );
                        });
                }
            );

            geonamesMarkers.push(marker);

            const item =
                createResultItem(
                    place,
                    position,
                    marker
                );

            resultsList.appendChild(item);

            validResults++;
        });

        resultsCount.textContent =
            `${validResults} results with valid coordinates`;

        statusElement.textContent =
            `Created ${validResults} search markers.`;

        if (validResults > 0) {
            map.fitBounds(
                bounds,
                60
            );
        } else {
            resultsList.textContent =
                "No results with valid coordinates were found.";
        }

        console.log(
            `Created ${validResults} markers.`
        );

    } catch (error) {
        if (requestId !== searchRequestId) {
            return;
        }

        console.error(
            "GeoNames search failed:",
            error
        );

        resultsCount.textContent =
            "Search failed";

        statusElement.textContent =
            error.message ||
            "Search failed. Please try again.";

        resultsList.textContent =
            "Unable to load results. Please try again.";
    }
}

searchForm.addEventListener(
    "submit",
    event => {
        event.preventDefault();

        const query =
            searchInput.value.trim();

        if (!query) {
            return;
        }

        searchPlaces(query);
    }
);

searchPlaces(
    searchInput.value.trim()
);