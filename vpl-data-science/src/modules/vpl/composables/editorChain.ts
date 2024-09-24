export const cleanQuotationMarks = (chain: string) => {
    return chain.replaceAll('"""', '');
};

export const getEditorChains = (documentContent: string) => {
    const arrayContent = documentContent
        .split('#<break-line>')
        .map((item) => cleanQuotationMarks(item));

    return {
        title: arrayContent[0] ?? '',
        description: arrayContent[1] ?? '',
        code: arrayContent[2] ?? '',
    };
};
