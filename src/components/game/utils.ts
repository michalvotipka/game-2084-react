export const getColor = (value: number) => {
    if (value >= 100) return "light-6" 
    if (value >= 50) return "light-5"  
    if (value >= 30) return "light-4"  
    if (value >= 10) return "light-3"
    if (value >= 5) return "light-2" 
    if (value > 0) return "light-1"   

    return "light-0"  
}