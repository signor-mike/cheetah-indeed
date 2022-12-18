const urlBuilder = (config) => {
    try {
        let result;
        const dividers = {
            comma: "%2C",
            space: "+",
        };
        const { title, location } = config;
        const jobQuery = title.replaceAll(" ", dividers.space);
        const locationQuery = location
            .replaceAll(",", dividers.comma)
            .replaceAll(" ", dividers.space);

        result = `?q=${jobQuery}&l=${locationQuery}`;
        return result;
    } catch (error) {
        console.log("error building URLs: ", error);
    }
};

export default urlBuilder;
