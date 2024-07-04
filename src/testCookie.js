async function fetchData(bucket) {
    const URLs = {
        GET_BUCKET_DATA: 'https://example.com/api/data'  // Update with your actual URL
    };
    const BUCKET_QUERY_PARAM = 'bucket=';  // Adjust if necessary

    const headers = {
        "Authorization": "Bearer " + tokens.accessToken,  // Ensure tokens.accessToken is defined
        "Cookie": "xxx"
    };

    const url = `https://gcp-stage.oneapi.volkswagen.com/bucketuploader/api/api?bucket=bentley-stat-stage`;

    try {
        const response = await fetch(url, { headers: headers });
        
        if (!response.ok) {
            console.log(response)
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const results = await response.json();
        console.log(results);
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}