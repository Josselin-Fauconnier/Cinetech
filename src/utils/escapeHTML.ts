export function escapeHTML (valeur: string) : string {
const div = document.createElement('div')
    div.textContent = valeur 
    return div.innerHTML
}
    
