import http from "http";

function callService({ hostname, port, path, method }) {
    return new Promise((resolve, reject) => {
        const req = http.request({ hostname, port, path, method }, (res) => {
            let data = "";
            res.on("data", (chunk) => (data += chunk));
            res.on("end", () => {
                try {
                    resolve(JSON.parse(data));
                } catch {
                    resolve(data); // fallback if not JSON
                }
            });
        });

        req.on("error", reject);

        setTimeout(() => {
            req.abort();
            reject(new Error("Timeout after 10s"));
        }, 10000);

        req.end();
    });
}

export const getAppInfo = async (req, res) => {
    try {
        const companyName = req.params.name;

        if (!companyName) {
            return res.status(400).json({ message: "Company name is required" });
        }

        const time = Date.now();

        const allocationServicePromise = callService({
            hostname: "localhost",
            port: 3000,
            path: `/allocation/getAllocationInfo/${companyName}`,
            method: "GET",
        });

        const logisticServicePromise = callService({
            hostname: "localhost",
            port: 5000,
            path: `/logistic/getLogisticInfo/${companyName}`,
            method: "GET",
        });

        const rateServicePromise = callService({
            hostname: "localhost",
            port: 6000,
            path: `/rate/getRateInfo/${companyName}`,
            method: "GET",
        });

        const [result1, result2, result3] = await Promise.all([
            allocationServicePromise,
            logisticServicePromise,
            rateServicePromise,
        ]);

        return res.status(200).json({
            companyName,
            time,
            value: result3.value,
            location: result2.location,
            duration: result1.duration,
        });
    } catch (error) {
        console.error("Error of getting data", error);
        return res.status(500).json({ message: "response fails" });
    }
};
