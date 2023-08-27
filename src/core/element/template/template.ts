export type TemplateData = {
  key: string,
  value: string
}

export class Template {
  constructor(
    private html: string,
    private data: TemplateData[]
  ) {}

  updateData(data: TemplateData[]): void {
    this.data = data
  }

  updateAndRender(data: TemplateData[]): string {
    this.updateData(data)
    return this.generate()
  }

  generate(): string {
    let generationResult = this.html

    this.data.forEach(dataValue => {
      //Yes, it looks as bad as it is
      generationResult = generationResult.replace(`{{${dataValue.key}}}`, dataValue.value)
      generationResult = generationResult.replace(`{{ ${dataValue.key}}}`, dataValue.value)
      generationResult = generationResult.replace(`{{${dataValue.key} }}`, dataValue.value)
      generationResult = generationResult.replace(`{{ ${dataValue.key} }}`, dataValue.value)
    })

    console.log("On render: ", generationResult)

    return generationResult
  }
}