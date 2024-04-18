export interface Medicine {
  id: string
  name: string
  published_at: string
  company: string
  documents: [
    {
      id: string
      expedient: string
      type: string
      url: string
    },
  ]
  active_principles: [
    {
      id: string
      name: string
    },
  ]
}
