class Solution {

    public static void main(String[] args) {
        String str = "idepax";
        System.out.println(trimTrailingVowels(str));
       
    }

    public static String trimTrailingVowels(String s) {
        StringBuilder sb = new StringBuilder(s);
        int n = s.length();

        for (int i = n - 1; i >= 0; i--) {

            if (s.charAt(i) == 'a' || s.charAt(i) == 'e' || s.charAt(i) == 'i' || s.charAt(i) == 'i'
                    || s.charAt(i) == 'o' || s.charAt(i) == 'u') {
                sb.deleteCharAt(i);
            } else {
                break;
            }
        }

        return sb.toString();
    }
}