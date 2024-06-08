export interface Document {
    id: number
    name: string
    blocked: boolean
    content: string
    createdBy: number
    createdByUserName: string
    createdAt: string
    updatedAt: string
}

export interface CreateDocumentRequest {
    name: string 
    content: string
}