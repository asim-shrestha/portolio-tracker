const getResErrorMessage = (err) => {
    const status = err.response.status;
    const data = err.response.data;

    // Check if message is already contained in response data
    if(data.message) {
        return data.message
    } else if(status === 422) {
        // Case where request failed with Express Validator
        // Loop through response and concatenate all the problematic values
        const badValues = err.response.data.errors.map((errValue) => {
            return errValue.param;
        }).join(", ");

        return ("Invalid values: " + badValues);
    } else {
        // Unknown error, log out the response to evaluate how to handle
        return "An error has a occured: Error code 476"
    }
}

export default getResErrorMessage;