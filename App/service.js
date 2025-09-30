import http from "http";
import { CLIENT_RENEG_LIMIT } from "tls";

function callService({ hostname, port, path, method }) {
    return new Promise((resolve, reject) => {
        const req = http.request({ hostname, port, path, method }, (res) => {
            console.log(hostname, port, path, method);
            let data = "";
            res.on("data", (chunk) => (data += chunk));
            res.on("end", () => {
                try {
                    resolve(JSON.parse(data));
                } catch (err) {
                    console.log(err);
                    resolve("no result");  
                }
            });
        });

       

        setTimeout(() => {
            req.abort();
            console.log(`Service ${hostname} TIMEOUT, using default`);
            resolve("time out"); 
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
            hostname: "allocation",
            port: 3000,
            path: `/allocation/getAllocationInfo/${companyName}`,
            method: "GET",
        });

        const logisticServicePromise = callService({
            hostname: "logistic",
            port: 5000,
            path: `/logistic/getLogisticInfo/${companyName}`,
            method: "GET",
        });

        const rateServicePromise = callService({
            hostname: "rate",
            port: 6000,
            path: `/rate/getRateInfo/${companyName}`,
            method: "GET"
        });

        const [result1, result2, result3] = await Promise.all([
            allocationServicePromise,
            logisticServicePromise,
            rateServicePromise,
        ]);

        console.log(result1);

        return res.status(200).json({
            companyName,
            time,
            value: result3.value || "no value",
            location: result2.location || "no location",
            duration: result1.duration || "no duration",
        });
    } catch (error) {
        console.error("Error of getting data", error);
        return res.status(500).json({ message: "internal server error" });
    }
};
