export default async function Letter({ params }: { params:  Promise<{ letter: string }>}) { 
  const { letter } = await params
  
  return (
    <div>Letter: {letter}</div>
  )
}