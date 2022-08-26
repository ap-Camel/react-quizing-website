export default function(number) {
    switch(number) {
        case 1:
            return "very easy"
        case 2:
            return "easy";
        case 3:
            return "normal";
        case 4:
            return "hard";
        case 5:
            return "very hard";
        default:
            return "undefined";
    }
}