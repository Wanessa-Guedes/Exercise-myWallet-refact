export default async function handleError(error, req, res, next) {
    console.error(error);

    return res.sendStatus(500).status("Internal Server Error");
}