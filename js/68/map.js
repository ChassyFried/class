
const GEONAMES_USERNAME = "csoro";

const [{ Map, InfoWindow }, { AdvancedMarkerElement }] = await Promise.all([
    google.maps.importLibrary("maps"),
    google.maps.importLibrary("marker")
]);

const bmgLoc = {
    lat: 40.09543950426593,
    lng: -74.2221793333354
};

const pcsLoc = {
    lat: 40.108884911823516,
    lng: -74.21764740599487
};

const map = new Map(document.getElementById("map"), {
    center: bmgLoc,
    zoom: 15,
    renderingType: "VECTOR",
    mapTypeId: "satellite",
    mapId: "DEMO_MAP_ID"
});

const bmgMarker = new AdvancedMarkerElement({
    map,
    position: bmgLoc,
    title: "BMG"
});

const pcsMarker = new AdvancedMarkerElement({
    map,
    position: pcsLoc,
    title: "PCS"
});

const infoWindow = new InfoWindow();

bmgMarker.addListener("click", () => {
    infoWindow.setContent("info about BMG Yeshiva");
    infoWindow.open({ anchor: bmgMarker, map });
});

pcsMarker.addListener("click", () => {
    infoWindow.setContent("info about PCS");
    infoWindow.open({ anchor: pcsMarker, map });
});

const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const resultsList = document.getElementById("results-list");

const geonamesMarkers = [];

function contentForPlace(place) {
    const content = document.createElement("div");

    const heading = document.createElement("h3");
    heading.textContent = place.title || "Untitled";
    content.appendChild(heading);

    const summary = document.createElement("p");
    summary.textContent = place.summary || "No summary available.";
    content.appendChild(summary);

    if (place.wikipediaUrl) {
        const link = document.createElement("a");

        link.href = place.wikipediaUrl.startsWith("http")
            ? place.wikipediaUrl
            : `https://${place.lang || "en"}.wikipedia.org/wiki/` +
            place.wikipediaUrl.split("/").pop();

        link.textContent = "Read on Wikipedia";
        link.target = "_blank";
        link.rel = "noopener noreferrer";

        content.appendChild(link);
    }

    return content;
}

searchForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const query = searchInput.value.trim();
    if (!query) return;

    geonamesMarkers.forEach(marker => {
        marker.map = null;
    });

    geonamesMarkers.length = 0;
    resultsList.replaceChildren();

    const params = new URLSearchParams({
        q: query,
        maxRows: "10",
        username: GEONAMES_USERNAME,
        type: "json"
    });

    const url = `https://secure.geonames.org/wikipediaSearchJSON?${params}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();

        if (!Array.isArray(data.geonames)) {
            throw new Error(
                data.status?.message || "Invalid GeoNames response"
            );
        }

        data.geonames.forEach(place => {
            if (place.lat == null || place.lng == null) return;

            const position = {
                lat: Number(place.lat),
                lng: Number(place.lng)
            };

            if (
                !Number.isFinite(position.lat) ||
                !Number.isFinite(position.lng)
            ) {
                return;
            }

            const markerOptions = {
                map,
                position,
                title: place.title || "Untitled"
            };

            if (place.thumbnailImg) {
                const img = document.createElement("img");

                img.src = place.thumbnailImg.replace(/^http:/, "https:");
                img.alt = place.title || "Wikipedia thumbnail";
                img.style.width = "40px";
                img.style.height = "40px";
                img.style.objectFit = "cover";
                img.style.borderRadius = "50%";
                img.style.border = "2px solid white";

                img.onerror = () => {
                    img.style.display = "none";
                };

                markerOptions.content = img;
            }

            const marker = new AdvancedMarkerElement(markerOptions);

            marker.addListener("click", () => {
                infoWindow.setContent(contentForPlace(place));
                infoWindow.open({ map, anchor: marker });
            });

            geonamesMarkers.push(marker);

            const item = document.createElement("div");
            item.className = "result-item";

            if (place.thumbnailImg) {
                const img = document.createElement("img");

                img.src = place.thumbnailImg.replace(/^http:/, "https:");
                img.alt = place.title || "Article thumbnail";

                img.onerror = () => {
                    img.style.display = "none";
                };

                item.appendChild(img);
            }

            const details = document.createElement("div");

            const title = document.createElement("h3");
            title.textContent = place.title || "Untitled";
            details.appendChild(title);

            const summary = document.createElement("p");
            summary.textContent = place.summary || "No summary available.";
            details.appendChild(summary);

            item.appendChild(details);

            item.addEventListener("click", () => {
                map.panTo(position);
                map.setZoom(15);

                infoWindow.setContent(contentForPlace(place));
                infoWindow.open({ map, anchor: marker });
            });

            resultsList.appendChild(item);
        });

        console.log(`Found ${geonamesMarkers.length} map markers.`);

        if (geonamesMarkers.length === 0) {
            resultsList.textContent = "No results found.";
        }
    } catch (error) {
        console.error("GeoNames search failed:", error);
        resultsList.textContent = "Search failed. Please try again.";
    }
});

searchForm.requestSubmit();