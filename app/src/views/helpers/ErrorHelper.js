const getResErrorMessage = (err) => {
    const status = err.response.status;

    // Case where request failed with Express Validator
    if (status == 422) {
        // Loop through response and concatenate all the problematic values
        const badValues = err.response.data.errors.map((errValue) => {
            return errValue.param;
        }).join(", ");

        return ("Invalid values: " + badValues);
    } else {
        return err.response.data;
    }
}

export default getResErrorMessage;