import java.util.*;

public class ContainsDuplicate {
    public static void main(String[] args) {
        System.out.println("Hello world!");
//        Integer nums[] = {1,2,3,3};
//        Set<Integer> uniques = new HashSet<>();
//        for (int i = 0; i < nums.length; i++) {
//            uniques.add(nums[i]);
//        }
//        Iterator it = uniques.iterator();
//
//        while(it.hasNext()){
//            System.out.println(it.next());
//        }

        String[] strs = {"eat","tea","tan","ate","nat","bat"};

        Map<String, List<String>> map = new HashMap<>();

        for (String word : strs) {
            char[] chars = word.toCharArray();
            Arrays.sort(chars);

            String sortedWord = new String(chars);
            System.out.println(sortedWord);

            if (!map.containsKey(sortedWord)) {
                map.put(sortedWord, new ArrayList<>());
            }

            map.get(sortedWord).add(word);
        }

        for (Map.Entry<String, List<String>> entry : map.entrySet()) {
            String key = entry.getKey();
            List<String> value = entry.getValue();

            System.out.println(key + ": " + value);
        }

    }
    public boolean containsDuplicate(int[] nums) {
        Set<Integer> uniques = new HashSet<>();
        for (int i = 0; i < nums.length; i++) {
            if (uniques.contains(nums[i])) {
                return true;
            }
            uniques.add(nums[i]);
        }
        return false;
    }
}
