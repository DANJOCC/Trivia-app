export interface Response {
    message: string,
    typeResponse: 'Error' | 'Success' | 'Fail',
    body: any  
}