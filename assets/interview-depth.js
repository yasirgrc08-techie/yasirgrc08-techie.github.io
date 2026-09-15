(function () {
    'use strict';
    const library = window.INTERVIEW_LIBRARY;
    if (!library) return;

    library.companyGuides = {
        Google: { url: 'https://www.google.com/about/careers/applications/how-we-hire/', focus: 'Practice invariants, alternative algorithms, complexity, and ambiguous requirements. Confirm the role-specific loop with your recruiter.' },
        Amazon: { url: 'https://www.amazon.jobs/content/en/how-we-hire/sde-ii-interview-prep', focus: 'Prepare syntactically correct, tested code, practical system design, and evidence-based Leadership Principle stories. The linked guidance is for SDE II; other levels can differ.' },
        Meta: { url: 'https://www.metacareers.com/careerprograms/preparing-for-your-software-engineering-interview', focus: 'This editorial practice track combines coding fundamentals and product-scale design. Confirm current format with your recruiter; the public prep page was rate-limited during this update.' },
        Microsoft: { url: 'https://careers.microsoft.com/v2/global/en/hiring-tips/technical-interviewing', focus: 'Prepare problem solving, design, coding, and testing. Add distributed systems, AI/ML, or networking depth when the role requires it.' },
        Apple: { url: 'https://www.apple.com/careers/us/work-at-apple.html', focus: 'Use the job description to choose the specialization. Practice implementation details, resource limits, privacy, and cross-functional trade-offs. The linked page describes work culture, not a question list.' },
        Netflix: { url: 'https://jobs.netflix.com/culture', focus: 'Connect technical decisions to business outcomes, operational judgment, and candid learning. Prepare relevant service or data-platform depth. The culture memo does not confirm specific interview questions.' },
        NVIDIA: { url: 'https://www.nvidia.com/en-us/about-nvidia/careers/how-we-hire/', focus: 'Confirm team and role requirements. For relevant roles, combine coding with memory, concurrency, performance, and inference-serving reasoning rather than studying generic AI trivia alone.' },
        Oracle: { url: 'https://www.oracle.com/careers/', focus: 'For database and cloud roles, practice data structures, transactions, consistency, and failure recovery. Treat this as an editorial role-alignment track, not a verified past-question catalogue.' }
    };

    function addCoding(topic, slug, title, level, companies, solution) {
        const group = library.dsa.find(candidate => candidate.topic === topic);
        if (!group) throw new Error('Unknown DSA topic: ' + topic);
        group.questions.push([slug, title, level, solution.approach[0], { companies, solution: { language: 'python', ...solution } }]);
    }

    addCoding('Two pointers', 'merge-sorted-array', 'Merge Sorted Array', 'Easy', ['Meta', 'Microsoft', 'Apple'], {
        problem: 'The first sorted array has room for both inputs. Merge in place; only its first first_count entries are initially valid. The function returns the mutated array for convenience.',
        approach: ['Write the larger remaining value into the last free slot, so unread entries in the first array are never overwritten.', 'Only the second array needs a final copy: remaining first-array values are already in their correct positions.'],
        complexity: 'O(first_count + second_count) time; O(1) auxiliary space.',
        code: `def merge_sorted(first, first_count, second, second_count):
    left = first_count - 1
    right = second_count - 1
    write = first_count + second_count - 1
    while right >= 0:
        if left >= 0 and first[left] > second[right]:
            first[write] = first[left]
            left -= 1
        else:
            first[write] = second[right]
            right -= 1
        write -= 1
    return first`,
        tests: ['assert merge_sorted([1, 2, 3, 0, 0, 0], 3, [2, 5, 6], 3) == [1, 2, 2, 3, 5, 6]', 'assert merge_sorted([0], 0, [1], 1) == [1]', 'assert merge_sorted([1], 1, [], 0) == [1]']
    });
    addCoding('Two pointers', 'move-zeroes', 'Move Zeroes', 'Easy', ['Meta', 'Apple', 'Oracle'], {
        problem: 'Move all zero values to the end in place while preserving the order of nonzero values.',
        approach: ['The write index always marks the next position for a nonzero value; scan each input position once.', 'Swap a nonzero value into that position, then advance write. This preserves the relative order of all nonzero values.'],
        complexity: 'O(n) time; O(1) auxiliary space.',
        code: `def move_zeroes(values):
    write = 0
    for read in range(len(values)):
        if values[read] != 0:
            values[write], values[read] = values[read], values[write]
            write += 1
    return values`,
        tests: ['assert move_zeroes([0, 1, 0, 3, 12]) == [1, 3, 12, 0, 0]', 'assert move_zeroes([0, 0]) == [0, 0]', 'assert move_zeroes([-1, 2]) == [-1, 2]']
    });
    addCoding('Two pointers', 'valid-palindrome-ii', 'Valid Palindrome II', 'Easy', ['Meta', 'Google', 'Amazon'], {
        problem: 'Return whether a string can become a palindrome after deleting at most one character.',
        approach: ['Advance inward while characters match. At the first mismatch, the only useful choices are deleting the left or the right character.', 'Check each remaining range with two pointers, without allocating substrings.'],
        complexity: 'O(n) time; O(1) auxiliary space.',
        code: `def valid_palindrome_one_removal(text):
    def matches(left, right):
        while left < right:
            if text[left] != text[right]:
                return False
            left += 1
            right -= 1
        return True
    left, right = 0, len(text) - 1
    while left < right:
        if text[left] != text[right]:
            return matches(left + 1, right) or matches(left, right - 1)
        left += 1
        right -= 1
    return True`,
        tests: ['assert valid_palindrome_one_removal("abca")', 'assert not valid_palindrome_one_removal("abc")', 'assert valid_palindrome_one_removal("")']
    });
    addCoding('Stack', 'minimum-remove-to-make-valid-parentheses', 'Minimum Remove to Make Valid Parentheses', 'Medium', ['Meta', 'Microsoft', 'Amazon'], {
        problem: 'Remove the fewest parentheses to make the string valid. Preserve all other characters. Any minimum-removal result is acceptable.',
        approach: ['Track unmatched opening-parenthesis indices. A closing parenthesis without a matching opening must be removed.', 'At the end, remove the opening indices still on the stack. Every removed parenthesis was unmatched, so the removal count is minimal.'],
        complexity: 'O(n) time; O(n) space including the output and index collections.',
        code: `def minimum_remove(text):
    openings = []
    removed = set()
    for index, character in enumerate(text):
        if character == '(':
            openings.append(index)
        elif character == ')':
            if openings:
                openings.pop()
            else:
                removed.add(index)
    removed.update(openings)
    return ''.join(character for index, character in enumerate(text) if index not in removed)`,
        tests: ['assert minimum_remove("lee(t(c)o)de)") == "lee(t(c)o)de"', 'assert minimum_remove("a)b(c)d") == "ab(c)d"', 'assert minimum_remove("))( (") == " "']
    });
    addCoding('Sliding window', 'find-all-anagrams-in-a-string', 'Find All Anagrams in a String', 'Medium', ['Amazon', 'Google', 'Microsoft'], {
        problem: 'For lowercase English strings, return all start indices of windows that are anagrams of a nonempty pattern.',
        approach: ['Maintain the frequency counts of a window whose length equals the pattern length, removing the outgoing character before comparison.', 'Equal frequency vectors, not equal character sets, establish an anagram. Fixed alphabet size makes each comparison constant time.'],
        complexity: 'O(n + m) time for a fixed 26-letter alphabet; O(1) auxiliary space excluding output.',
        code: `def find_anagrams(text, pattern):
    if not pattern or len(pattern) > len(text):
        return []
    required = [0] * 26
    window = [0] * 26
    for character in pattern:
        required[ord(character) - ord('a')] += 1
    result = []
    for right, character in enumerate(text):
        window[ord(character) - ord('a')] += 1
        if right >= len(pattern):
            window[ord(text[right - len(pattern)]) - ord('a')] -= 1
        if right >= len(pattern) - 1 and window == required:
            result.append(right - len(pattern) + 1)
    return result`,
        tests: ['assert find_anagrams("cbaebabacd", "abc") == [0, 6]', 'assert find_anagrams("abab", "ab") == [0, 1, 2]', 'assert find_anagrams("a", "aa") == []']
    });
    addCoding('Sliding window', 'longest-subarray-of-1s-after-deleting-one-element', 'Longest Subarray of 1s After Deleting One Element', 'Medium', ['Google', 'Microsoft', 'Netflix'], {
        problem: 'Delete exactly one element of a binary array and return the longest remaining contiguous run of ones.',
        approach: ['Keep a window containing at most one zero by moving the left edge when the zero budget is exceeded.', 'The achievable length is window length minus one, even when the input is all ones, because deletion is mandatory.'],
        complexity: 'O(n) time; O(1) auxiliary space.',
        code: `def longest_ones_after_deletion(values):
    left = 0
    zeroes = 0
    best = 0
    for right, value in enumerate(values):
        zeroes += value == 0
        while zeroes > 1:
            zeroes -= values[left] == 0
            left += 1
        best = max(best, right - left)
    return best`,
        tests: ['assert longest_ones_after_deletion([1, 1, 0, 1]) == 3', 'assert longest_ones_after_deletion([1, 1, 1]) == 2', 'assert longest_ones_after_deletion([0, 0, 0]) == 0']
    });
    addCoding('Binary search', 'search-insert-position', 'Search Insert Position', 'Easy', ['Apple', 'Oracle', 'NVIDIA'], {
        problem: 'Return the first index whose sorted-array value is at least the target, or the length if no such index exists.',
        approach: ['Maintain a half-open search interval. Everything before left is smaller than the target; the answer never lies after right.', 'Move right to the midpoint for values at least the target, retaining a possible answer at that position.'],
        complexity: 'O(log n) time; O(1) auxiliary space.',
        code: `def search_insert(values, target):
    left, right = 0, len(values)
    while left < right:
        middle = (left + right) // 2
        if values[middle] < target:
            left = middle + 1
        else:
            right = middle
    return left`,
        tests: ['assert search_insert([1, 3, 5, 6], 5) == 2', 'assert search_insert([1, 3, 5, 6], 7) == 4', 'assert search_insert([], 2) == 0']
    });
    addCoding('Binary search', 'find-first-and-last-position-of-element-in-sorted-array', 'Find First and Last Position in Sorted Array', 'Medium', ['Google', 'Meta', 'Oracle'], {
        problem: 'Find the first and last positions of a target in a sorted array. Return [-1, -1] if it is absent.',
        approach: ['Use a lower bound for the first occurrence and an upper bound for the first value greater than the target.', 'Validate that the lower-bound position actually contains the target before deriving the inclusive final position.'],
        complexity: 'O(log n) time; O(1) auxiliary space.',
        code: `from bisect import bisect_left, bisect_right

def search_range(values, target):
    first = bisect_left(values, target)
    if first == len(values) or values[first] != target:
        return [-1, -1]
    return [first, bisect_right(values, target) - 1]`,
        tests: ['assert search_range([5, 7, 7, 8, 8, 10], 8) == [3, 4]', 'assert search_range([2, 2], 2) == [0, 1]', 'assert search_range([], 1) == [-1, -1]']
    });
    addCoding('Binary search', 'find-peak-element', 'Find Peak Element', 'Medium', ['Google', 'Microsoft', 'NVIDIA'], {
        problem: 'Adjacent values differ. Find any index strictly higher than its neighbors, treating out-of-array neighbors as negative infinity.',
        approach: ['Compare the midpoint with its right neighbor. An uphill slope guarantees a peak to the right; a downhill slope retains one on the left including the midpoint.', 'Stop when the interval contains one index. This avoids scanning every element.'],
        complexity: 'O(log n) time; O(1) auxiliary space. Empty input returns -1 as an explicit extension.',
        code: `def find_peak(values):
    if not values:
        return -1
    left, right = 0, len(values) - 1
    while left < right:
        middle = (left + right) // 2
        if values[middle] > values[middle + 1]:
            right = middle
        else:
            left = middle + 1
    return left`,
        tests: ['assert find_peak([1, 2, 3, 1]) == 2', 'assert find_peak([5, 4, 3]) == 0', 'assert find_peak([1]) == 0']
    });
    addCoding('Binary search', 'capacity-to-ship-packages-within-d-days', 'Capacity to Ship Packages Within D Days', 'Medium', ['Amazon', 'Google', 'Netflix'], {
        problem: 'Ship positive-weight packages in their original order within a positive number of days. Find the smallest daily capacity.',
        approach: ['Capacity feasibility is monotone. Greedily fill a day before starting the next, then binary-search between the largest package and the total weight.', 'The greedy pass uses the fewest possible days for a fixed capacity because delaying an eligible package cannot help subsequent days.'],
        complexity: 'O(n log(sum(weights) - max(weights) + 1)) time; O(1) auxiliary space.',
        code: `def ship_capacity(weights, days):
    if not weights:
        return 0
    left, right = max(weights), sum(weights)
    while left < right:
        capacity = (left + right) // 2
        used_days, load = 1, 0
        for weight in weights:
            if load + weight > capacity:
                used_days += 1
                load = 0
            load += weight
        if used_days <= days:
            right = capacity
        else:
            left = capacity + 1
    return left`,
        tests: ['assert ship_capacity([1, 2, 3, 1, 1], 4) == 3', 'assert ship_capacity([3, 2, 2, 4, 1, 4], 3) == 6', 'assert ship_capacity([5, 2], 1) == 7']
    });
    addCoding('Stack', 'decode-string', 'Decode String', 'Medium', ['Google', 'Amazon', 'Microsoft'], {
        problem: 'Decode a valid expression such as 3[a2[c]]. A positive integer repeats the following bracketed expression; digits do not appear as literal output.',
        approach: ['Push the previous output and repeat count when entering a bracket, then combine them when closing it.', 'Accumulate multidigit counts numerically. Nested expressions need a stack, not a flat string replacement.'],
        complexity: 'O(input length + total characters copied across nested expansions) time; O(input length + decoded output length) space. Repeated nested copying is not simply O(input length).',
        code: `def decode_string(encoded):
    stack = []
    current = []
    repeat = 0
    for character in encoded:
        if '0' <= character <= '9':
            repeat = repeat * 10 + int(character)
        elif character == '[':
            stack.append((current, repeat))
            current, repeat = [], 0
        elif character == ']':
            previous, count = stack.pop()
            current = previous + current * count
        else:
            current.append(character)
    return ''.join(current)`,
        tests: ['assert decode_string("3[a2[c]]") == "accaccacc"', 'assert decode_string("2[ab]3[c]d") == "ababcccd"', 'assert decode_string("10[a]") == "a" * 10']
    });
    addCoding('Stack', 'basic-calculator-ii', 'Basic Calculator II', 'Medium', ['Meta', 'Oracle', 'Microsoft'], {
        problem: 'Evaluate a valid expression of nonnegative integers and +, -, *, /. There are no parentheses; integer division truncates toward zero.',
        approach: ['Collect additive terms in a stack, but collapse multiplication and division immediately to respect precedence.', 'Use integer arithmetic for truncation toward zero. Converting large integers to float can lose precision.'],
        complexity: 'O(n) time; O(n) auxiliary space.',
        code: `def calculate(expression):
    terms = []
    number = 0
    operator = '+'
    for character in expression + '+':
        if character.isdigit():
            number = number * 10 + int(character)
        elif character != ' ':
            if operator == '+':
                terms.append(number)
            elif operator == '-':
                terms.append(-number)
            elif operator == '*':
                terms.append(terms.pop() * number)
            else:
                previous = terms.pop()
                quotient = abs(previous) // number
                terms.append(quotient if previous >= 0 else -quotient)
            operator, number = character, 0
    return sum(terms)`,
        tests: ['assert calculate("3+2*2") == 7', 'assert calculate("14-3/2") == 13', 'assert calculate(" 3+5 / 2 ") == 5']
    });
    addCoding('Heaps & scheduling', 'reorganize-string', 'Reorganize String', 'Medium', ['Amazon', 'Google', 'Netflix'], {
        problem: 'Rearrange characters so adjacent characters differ. Return an empty string if impossible; any valid arrangement is acceptable.',
        approach: ['Use a max-heap of remaining character counts, withholding the previously used character for one turn.', 'If a withheld character still has remaining copies when the heap is empty, no valid continuation exists.'],
        complexity: 'O(n log a) time; O(a) auxiliary space excluding output, where a is the number of distinct characters.',
        code: `from collections import Counter
from heapq import heapify, heappop, heappush

def reorganize(text):
    heap = [(-count, character) for character, count in Counter(text).items()]
    heapify(heap)
    result = []
    previous_count, previous_character = 0, ''
    while heap:
        count, character = heappop(heap)
        result.append(character)
        if previous_count < 0:
            heappush(heap, (previous_count, previous_character))
        previous_count, previous_character = count + 1, character
    return ''.join(result) if previous_count == 0 else ''`,
        tests: ['assert reorganize("aaab") == ""', 'result = reorganize("aabbc"); assert Counter(result) == Counter("aabbc") and all(result[index] != result[index - 1] for index in range(1, len(result)))', 'assert reorganize("a") == "a"']
    });
    addCoding('Arrays & hashing', 'insert-delete-getrandom-o1', 'Insert Delete GetRandom O(1)', 'Medium', ['Meta', 'Amazon', 'Microsoft'], {
        problem: 'Support insertion, removal, and uniformly random selection from distinct stored values. Random selection is only called on a nonempty set.',
        approach: ['Store values densely in an array and map each value to its index. Deletion fills the hole with the last element.', 'Update the moved element index before removing the deleted mapping. Random choice over the dense array gives every stored value equal probability.'],
        complexity: 'Expected O(1) per operation; O(n) stored space. Dynamic-array insertion is amortized.',
        code: `import random

class RandomizedSet:
    def __init__(self):
        self.values = []
        self.positions = {}

    def insert(self, value):
        if value in self.positions:
            return False
        self.positions[value] = len(self.values)
        self.values.append(value)
        return True

    def remove(self, value):
        if value not in self.positions:
            return False
        index = self.positions[value]
        last = self.values[-1]
        self.values[index] = last
        self.positions[last] = index
        self.values.pop()
        del self.positions[value]
        return True

    def get_random(self):
        return random.choice(self.values)`,
        tests: ['stored = RandomizedSet(); assert stored.insert(1); assert not stored.insert(1); assert stored.get_random() == 1', 'stored = RandomizedSet(); stored.insert(1); stored.insert(2); assert stored.remove(1); assert stored.get_random() == 2; assert not stored.remove(1)', 'stored = RandomizedSet(); stored.insert(3); assert stored.remove(3); assert stored.values == [] and stored.positions == {}']
    });
    addCoding('Linked lists', 'lfu-cache', 'LFU Cache', 'Hard', ['Amazon', 'Oracle', 'NVIDIA'], {
        problem: 'Evict the least frequently used key at capacity; break frequency ties by least recent use. A get or update increases frequency.',
        approach: ['Map keys to value/frequency pairs and keep an OrderedDict for each frequency, ordered by last use.', 'Track the minimum occupied frequency. Remove empty frequency buckets so space stays proportional to capacity, not the number of operations.'],
        complexity: 'Expected O(1) get and put; O(capacity) space under the usual hash-table model.',
        code: `from collections import defaultdict, OrderedDict

class LFUCache:
    def __init__(self, capacity):
        self.capacity = capacity
        self.entries = {}
        self.buckets = defaultdict(OrderedDict)
        self.minimum = 0

    def get(self, key):
        if key not in self.entries:
            return -1
        value, frequency = self.entries[key]
        del self.buckets[frequency][key]
        if not self.buckets[frequency]:
            del self.buckets[frequency]
            if self.minimum == frequency:
                self.minimum += 1
        self.entries[key] = (value, frequency + 1)
        self.buckets[frequency + 1][key] = None
        return value

    def put(self, key, value):
        if self.capacity <= 0:
            return
        if key in self.entries:
            self.entries[key] = (value, self.entries[key][1])
            self.get(key)
            return
        if len(self.entries) == self.capacity:
            evicted, _unused = self.buckets[self.minimum].popitem(last=False)
            del self.entries[evicted]
            if not self.buckets[self.minimum]:
                del self.buckets[self.minimum]
        self.entries[key] = (value, 1)
        self.buckets[1][key] = None
        self.minimum = 1`,
        tests: ['cache = LFUCache(2); cache.put(1, 1); cache.put(2, 2); assert cache.get(1) == 1; cache.put(3, 3); assert cache.get(2) == -1 and cache.get(3) == 3', 'cache = LFUCache(2); cache.put(1, 10); cache.put(2, 20); cache.get(1); cache.get(2); cache.put(3, 30); assert cache.get(1) == -1 and cache.get(2) == 20', 'cache = LFUCache(0); cache.put(1, 1); assert cache.get(1) == -1', 'cache = LFUCache(1); cache.put(1, 1); [cache.get(1) for _unused in range(100)]; assert len(cache.buckets) == 1']
    });
    addCoding('Trees', 'binary-tree-vertical-order-traversal', 'Binary Tree Vertical Order Traversal', 'Medium', ['Meta', 'Google', 'Oracle'], {
        problem: 'Group a binary tree by column, from left to right. Within a column use top-to-bottom order, and left-to-right order for row ties. Nodes have val, left, and right fields. The linked platform problem may require a subscription.',
        approach: ['Breadth-first traversal visits rows in order. Enqueue left before right to preserve the required tie order.', 'Track minimum and maximum columns, then read that contiguous column range without sorting all nodes.'],
        complexity: 'O(n) time; O(n) auxiliary space.',
        code: `from collections import defaultdict, deque

def vertical_order(root):
    if root is None:
        return []
    columns = defaultdict(list)
    queue = deque([(root, 0)])
    minimum = maximum = 0
    while queue:
        node, column = queue.popleft()
        columns[column].append(node.val)
        minimum, maximum = min(minimum, column), max(maximum, column)
        if node.left:
            queue.append((node.left, column - 1))
        if node.right:
            queue.append((node.right, column + 1))
    return [columns[column] for column in range(minimum, maximum + 1)]`,
        tests: ['root = TreeNode(3, TreeNode(9), TreeNode(20, TreeNode(15), TreeNode(7))); assert vertical_order(root) == [[9], [3, 15], [20], [7]]', 'assert vertical_order(None) == []', 'assert vertical_order(TreeNode(1)) == [[1]]']
    });
    addCoding('Trees', 'lowest-common-ancestor-of-a-binary-tree', 'Lowest Common Ancestor of a Binary Tree', 'Medium', ['Meta', 'Amazon', 'Microsoft'], {
        problem: 'Find the lowest common ancestor of two node objects in a binary tree, using identity rather than value equality. Return None if either is absent.',
        approach: ['Build parent links iteratively until both target nodes have been found. This avoids recursion-depth failure on a long chain.', 'Mark the first target ancestry, then climb from the second target to the first shared node.'],
        complexity: 'O(n) time; O(n) auxiliary space.',
        code: `def lowest_common_ancestor(root, first, second):
    if root is None:
        return None
    parents = {root: None}
    stack = [root]
    while stack and (first not in parents or second not in parents):
        node = stack.pop()
        for child in (node.left, node.right):
            if child is not None:
                parents[child] = node
                stack.append(child)
    if first not in parents or second not in parents:
        return None
    ancestors = set()
    while first is not None:
        ancestors.add(first)
        first = parents[first]
    while second not in ancestors:
        second = parents[second]
    return second`,
        tests: ['root = TreeNode(1, TreeNode(2), TreeNode(3)); assert lowest_common_ancestor(root, root.left, root.right) is root', 'root = TreeNode(1, TreeNode(2)); assert lowest_common_ancestor(root, root, root.left) is root', 'root = TreeNode(1); assert lowest_common_ancestor(root, root, TreeNode(1)) is None']
    });
    addCoding('Trees', 'all-nodes-distance-k-in-binary-tree', 'All Nodes Distance K in Binary Tree', 'Medium', ['Amazon', 'Meta', 'Google'], {
        problem: 'Return values of nodes exactly distance edges from a target node in a binary tree. Output order is unrestricted; node identity determines visitation.',
        approach: ['Add parent links so the tree can be traversed as an undirected graph. Starting from the target, run breadth-first search.', 'Stop expanding a node once it reaches the requested distance; a visited set prevents walking back along an edge.'],
        complexity: 'O(n) time; O(n) auxiliary space.',
        code: `from collections import deque

def nodes_at_distance(root, target, distance):
    if root is None or distance < 0:
        return []
    parents = {root: None}
    stack = [root]
    while stack:
        node = stack.pop()
        for child in (node.left, node.right):
            if child is not None:
                parents[child] = node
                stack.append(child)
    if target not in parents:
        return []
    queue = deque([(target, 0)])
    visited = {target}
    result = []
    while queue:
        node, depth = queue.popleft()
        if depth == distance:
            result.append(node.val)
            continue
        for neighbor in (node.left, node.right, parents[node]):
            if neighbor is not None and neighbor not in visited:
                visited.add(neighbor)
                queue.append((neighbor, depth + 1))
    return result`,
        tests: ['root = TreeNode(1, TreeNode(2, TreeNode(4)), TreeNode(3)); assert sorted(nodes_at_distance(root, root.left, 1)) == [1, 4]', 'root = TreeNode(1); assert nodes_at_distance(root, root, 0) == [1]', 'root = TreeNode(1); assert nodes_at_distance(root, root, 3) == []']
    });
    addCoding('Trees', 'path-sum-iii', 'Path Sum III', 'Medium', ['Google', 'Microsoft', 'Oracle'], {
        problem: 'Count downward paths whose values sum to a target. A path can start or end at any node but must follow parent-to-child edges.',
        approach: ['Count earlier prefix sums on the current ancestor path. For a new total, prefixes equal to total minus target contribute valid paths.', 'Use explicit exit frames to remove a prefix after its subtree. Without this cleanup, sibling branches create false matches.'],
        complexity: 'O(n) expected time; O(h) active traversal and prefix state, where h is tree height.',
        code: `def count_path_sums(root, target):
    prefixes = {0: 1}
    count = 0
    stack = [(root, 0, False)]
    while stack:
        node, total, exiting = stack.pop()
        if node is None:
            continue
        if exiting:
            prefixes[total] -= 1
            if prefixes[total] == 0:
                del prefixes[total]
            continue
        total += node.val
        count += prefixes.get(total - target, 0)
        prefixes[total] = prefixes.get(total, 0) + 1
        stack.append((node, total, True))
        stack.append((node.right, total, False))
        stack.append((node.left, total, False))
    return count`,
        tests: ['root = TreeNode(1, TreeNode(1), TreeNode(1)); assert count_path_sums(root, 2) == 2', 'root = TreeNode(0, TreeNode(0), TreeNode(0)); assert count_path_sums(root, 0) == 5', 'assert count_path_sums(None, 0) == 0']
    });
    addCoding('Graphs', 'shortest-path-in-binary-matrix', 'Shortest Path in Binary Matrix', 'Medium', ['Meta', 'Google', 'NVIDIA'], {
        problem: 'In a square binary grid, find the shortest path of zero cells from the top-left to bottom-right using eight directions. Path length counts cells.',
        approach: ['Use breadth-first search because each move has equal cost. Mark cells when enqueuing rather than when removing them from the queue.', 'Reject blocked endpoints immediately, and return one for a single open cell. The implementation does not modify the input.'],
        complexity: 'O(n squared) time and auxiliary space for an n by n grid.',
        code: `from collections import deque

def shortest_binary_path(grid):
    if not grid or grid[0][0] or grid[-1][-1]:
        return -1
    size = len(grid)
    queue = deque([(0, 0, 1)])
    visited = {(0, 0)}
    while queue:
        row, column, length = queue.popleft()
        if row == column == size - 1:
            return length
        for row_delta in (-1, 0, 1):
            for column_delta in (-1, 0, 1):
                next_row, next_column = row + row_delta, column + column_delta
                if 0 <= next_row < size and 0 <= next_column < size and grid[next_row][next_column] == 0 and (next_row, next_column) not in visited:
                    visited.add((next_row, next_column))
                    queue.append((next_row, next_column, length + 1))
    return -1`,
        tests: ['assert shortest_binary_path([[0, 1], [1, 0]]) == 2', 'assert shortest_binary_path([[1, 0], [0, 0]]) == -1', 'assert shortest_binary_path([[0]]) == 1']
    });
    addCoding('Graphs', 'number-of-operations-to-make-network-connected', 'Number of Operations to Make Network Connected', 'Medium', ['Microsoft', 'NVIDIA', 'Oracle'], {
        problem: 'Rewire existing undirected cables to connect all computers, numbered zero through count minus one. Return the minimum moves, or -1 if there are too few cables.',
        approach: ['A connected graph requires at least count minus one cables. If that budget exists, count the current connected components using disjoint sets.', 'Each spare cable can merge two components, so the answer is components minus one. Union by size and path compression keep operations nearly constant.'],
        complexity: 'O((n + edges) alpha(n)) time; O(n) auxiliary space.',
        code: `def connect_network(count, connections):
    if count <= 1:
        return 0
    if len(connections) < count - 1:
        return -1
    parent = list(range(count))
    size = [1] * count
    components = count
    def find(node):
        while parent[node] != node:
            parent[node] = parent[parent[node]]
            node = parent[node]
        return node
    for first, second in connections:
        first, second = find(first), find(second)
        if first != second:
            if size[first] < size[second]:
                first, second = second, first
            parent[second] = first
            size[first] += size[second]
            components -= 1
    return components - 1`,
        tests: ['assert connect_network(4, [[0, 1], [0, 2], [1, 2]]) == 1', 'assert connect_network(6, [[0, 1], [0, 2], [0, 3], [1, 2]]) == -1', 'assert connect_network(1, []) == 0']
    });
    addCoding('Graphs', 'evaluate-division', 'Evaluate Division', 'Medium', ['Google', 'Microsoft', 'Oracle'], {
        problem: 'Given consistent positive ratios between named variables, answer division queries. Unknown or disconnected variables produce -1.0.',
        approach: ['Represent each equation as two directed weighted edges, with reciprocal weights in the reverse direction.', 'A path product gives the requested ratio. Check variable existence before treating a self-query as one.'],
        complexity: 'O(edges + queries * (vertices + edges)) time; O(vertices + edges) space.',
        code: `from collections import defaultdict, deque

def evaluate_division(equations, values, queries):
    graph = defaultdict(list)
    for (numerator, denominator), value in zip(equations, values):
        graph[numerator].append((denominator, value))
        graph[denominator].append((numerator, 1.0 / value))
    result = []
    for source, destination in queries:
        if source not in graph or destination not in graph:
            result.append(-1.0)
            continue
        queue = deque([(source, 1.0)])
        visited = {source}
        answer = -1.0
        while queue:
            node, product = queue.popleft()
            if node == destination:
                answer = product
                break
            for neighbor, weight in graph[node]:
                if neighbor not in visited:
                    visited.add(neighbor)
                    queue.append((neighbor, product * weight))
        result.append(answer)
    return result`,
        tests: ['assert evaluate_division([["a", "b"], ["b", "c"]], [2.0, 3.0], [["a", "c"], ["a", "a"], ["x", "x"]]) == [6.0, 1.0, -1.0]', 'assert evaluate_division([["a", "b"]], [2.0], [["b", "a"]]) == [0.5]', 'assert evaluate_division([["a", "b"], ["c", "d"]], [2.0, 4.0], [["a", "d"]]) == [-1.0]']
    });
    addCoding('1D dynamic programming', 'maximum-profit-in-job-scheduling', 'Maximum Profit in Job Scheduling', 'Hard', ['Google', 'Amazon', 'Netflix'], {
        problem: 'Choose non-overlapping jobs to maximize total profit. A job ending at a time is compatible with a job starting at that same time.',
        approach: ['Sort by ending time and let best[index] mean the best profit using that many earlier jobs.', 'For each job, binary-search the number of earlier jobs ending no later than its start. Compare taking it plus that prefix optimum with skipping it.'],
        complexity: 'O(n log n) time; O(n) auxiliary space.',
        code: `from bisect import bisect_right

def maximum_job_profit(start_times, end_times, profits):
    jobs = sorted(zip(end_times, start_times, profits))
    ends = [job[0] for job in jobs]
    best = [0]
    for index, (end, start, profit) in enumerate(jobs):
        compatible = bisect_right(ends, start, 0, index)
        best.append(max(best[-1], profit + best[compatible]))
    return best[-1]`,
        tests: ['assert maximum_job_profit([1, 2, 3, 3], [3, 4, 5, 6], [50, 10, 40, 70]) == 120', 'assert maximum_job_profit([], [], []) == 0', 'assert maximum_job_profit([1, 2], [2, 3], [5, 6]) == 11']
    });
    addCoding('1D dynamic programming', 'minimum-cost-for-tickets', 'Minimum Cost For Tickets', 'Medium', ['Amazon', 'Apple', 'Netflix'], {
        problem: 'Cover travel days with 1-, 7-, and 30-day passes at the three given costs. Find the minimum cost; a pass includes its purchase day.',
        approach: ['Sort unique travel days and define the best cost from each travel index onward.', 'For each pass, jump to the first travel date at or beyond purchase day plus duration. This makes expiry boundaries explicit.'],
        complexity: 'O(n log n) time including sorting and bound searches; O(n) auxiliary space.',
        code: `from bisect import bisect_left

def minimum_ticket_cost(days, costs):
    days = sorted(set(days))
    best = [0] * (len(days) + 1)
    for index in range(len(days) - 1, -1, -1):
        best[index] = min(cost + best[bisect_left(days, days[index] + duration)] for duration, cost in zip((1, 7, 30), costs))
    return best[0]`,
        tests: ['assert minimum_ticket_cost([1, 4, 6, 7, 8, 20], [2, 7, 15]) == 11', 'assert minimum_ticket_cost([], [2, 7, 15]) == 0', 'assert minimum_ticket_cost([1, 365], [2, 7, 15]) == 4']
    });
    function addDesign(id, title, track, companies, solution) {
        library.design.push({ id, title, track, companies, level: 'Hard', topic: track === 'ai' ? 'AI-native systems' : 'Worked design cases', prompt: solution.problem, focus: solution.approach.slice(0, 3), followUp: solution.followUpQuestion, reference: solution.reference, solution });
    }

    addDesign('product-search-case', 'Product Search with Fresh Inventory', 'hld', ['Amazon', 'Google', 'Oracle'], {
        problem: 'Design product search with text queries, filters, ranked results, and rapidly changing price and inventory.',
        assumptions: ['100 million products; 2,000 average and 10,000 peak searches/second.', 'Assume a 150 ms API p95 target. Search can be eventually consistent, but checkout must verify current price and stock.'],
        capacity: 'At 2 KB of searchable fields per product, source documents alone occupy about 200 GB before index overhead and replicas. Benchmark shard fan-out at the peak workload rather than dividing only average traffic.',
        api: 'GET /v1/search?q=&filters=&cursor=\nProductChanged {product_id, version, deleted}\nGET /v1/products/{id} for authoritative detail',
        dataModel: 'Products(product_id, version, price_minor, currency, inventory_version); inverted index plus filter fields; durable change log. Cursors bind query hash, index snapshot/version, score, and product ID.',
        architecture: 'Product DB + transactional outbox -> event log -> index workers -> search shards\nClient -> query API -> candidate retrieval -> ranker -> result hydration\nCheckout -> authoritative pricing and inventory services',
        approach: ['Write product changes and outbox records in one transaction. Index workers apply only versions newer than the indexed version and retain deletion tombstones.', 'Retrieve a bounded candidate set using lexical search and filters, then rerank and hydrate only the top results. Cache normalized popular queries briefly.', 'Use snapshot-aware cursors or explicitly document best-effort pagination during index changes. Surface index lag and reject invalid cursors rather than silently repeating pages.'],
        tradeoffs: ['More replicas increase read throughput and availability but not primary indexing capacity.', 'A search index is optimized for retrieval, not inventory reservation. Strong consistency on every search would add latency and couple it to transactional availability.'],
        pitfalls: ['Using cached search prices to charge the customer.', 'Updating the database and event log independently, losing changes during a crash.'],
        followUpQuestion: 'A product is recalled while its search index is behind. How is it removed from user-visible results?',
        followUpAnswer: 'Maintain an authoritative suppression check during result hydration and checkout. Push tombstones to the index and invalidate caches, but do not rely on propagation alone for safety-critical visibility changes.',
        reference: 'https://learn.microsoft.com/en-us/azure/architecture/patterns/materialized-view'
    });
    addDesign('privacy-feed-case', 'Social Feed with Privacy Changes', 'hld', ['Meta', 'Google', 'Microsoft'], {
        problem: 'Design a social feed that supports follows, ranked pagination, blocks, deleted posts, and changes to audience visibility.',
        assumptions: ['10 million daily users and 20 feed reads each: about 2,315 average reads/second; assume a 10x peak.', 'Per-post access decisions must respect current permissions even if feed materialization is stale.'],
        capacity: '200 million daily reads are not 200 million requests/second. Plan separately for celebrity write bursts and the number of hydrated posts per page.',
        api: 'POST /posts with an idempotency key\nGET /feed?cursor=\nPUT /posts/{id}/audience\nPOST /blocks/{user_id}',
        dataModel: 'Posts(post_id, author_id, version, audience_version, deleted); FollowEdges; BlockEdges; materialized feed IDs; ranking snapshot token.',
        architecture: 'Post service -> durable event log -> fan-out workers -> feed ID cache\nFeed API -> cached candidate IDs + celebrity merge -> rank -> current authorization -> hydration',
        approach: ['Fan out ordinary accounts on write, but merge very high-fan-out accounts on read. Set the threshold from measured fan-out cost and activity, not a universal follower number.', 'Store references in feed caches instead of full private content. Check current audience and block relationships when hydrating results.', 'Use deterministic tie-breakers and bounded ranking sessions for pagination. Process removal events idempotently and monitor propagation lag.'],
        tradeoffs: ['Fan-out on write reduces read latency but multiplies write and storage cost.', 'Rechecking authorization costs latency; serving a revoked private post to avoid that check is not an acceptable fallback.'],
        pitfalls: ['Assuming deleting a cached feed entry is sufficient access control.', 'Using an unstable score-only cursor when items have equal scores or scores change.'],
        followUpQuestion: 'A user blocks someone while fan-out workers are unavailable. Can an old feed reveal their posts?',
        followUpAnswer: 'Candidate IDs may remain cached, but the final authorization check must exclude them using current policy. If the authoritative policy service is unavailable, fail closed for private content rather than treating stale permissions as valid.',
        reference: 'https://learn.microsoft.com/en-us/azure/architecture/patterns/cache-aside'
    });
    addDesign('media-pipeline-case', 'Resumable Upload and Transcoding Pipeline', 'hld', ['Netflix', 'Amazon', 'Apple'], {
        problem: 'Design reliable large-video uploads, asynchronous transcoding, publication, and global playback.',
        assumptions: ['100,000 uploads/day averaging 100 MB: 10 TB/day of source data before replication.', '50,000 simultaneous streams at 4 Mb/s require about 200 Gb/s of delivery bandwidth; use a CDN.'],
        capacity: 'Estimate source retention and rendition multipliers independently. Queue capacity is determined by arrival rate, processing time, and allowed backlog, not by the number of web servers.',
        api: 'POST /uploads -> upload_id and scoped multipart URLs\nPOST /uploads/{id}/complete with checksums\nGET /videos/{id}/status\nGET /videos/{id}/playback-manifest',
        dataModel: 'Upload(upload_id, owner, parts, expiry); Video(video_id, source_version, status); TranscodeJob(video_id, source_version, profile, attempt); published rendition manifest.',
        architecture: 'Client -> scoped object-storage upload -> completion validator\nValidated source -> durable queue -> transcode workers -> renditions -> atomic manifest publish -> CDN',
        approach: ['Let clients upload parts directly to object storage. Validate ownership, checksums, and completeness before creating a durable processing job.', 'Use video/version/profile as a stable job identity. A retried worker writes a versioned temporary result and conditionally publishes completion, avoiding duplicate visible renditions.', 'Publish only a coherent set of playable renditions. Keep abandoned uploads under a lifecycle policy and apply per-tenant upload and transcode quotas.'],
        tradeoffs: ['Precomputing more profiles improves playback compatibility but increases compute and storage.', 'Direct uploads remove API bandwidth bottlenecks but require narrowly scoped authorization and a verified completion step.'],
        pitfalls: ['Publishing a manifest before all referenced objects exist.', 'Using retries without a job identity, multiplying expensive transcoding work.'],
        followUpQuestion: 'A worker crashes after writing a rendition but before acknowledging the job. What happens?',
        followUpAnswer: 'The queue redelivers. The replacement checks the stable job/version identity and existing verified rendition, then conditionally commits completion and acknowledges. Do not infer success from an unverified partial object.',
        reference: 'https://learn.microsoft.com/en-us/azure/architecture/patterns/queue-based-load-leveling'
    });
    addDesign('offline-sync-case', 'Multi-Device File Sync with Offline Edits', 'hld', ['Apple', 'Microsoft', 'Google'], {
        problem: 'Design file synchronization across devices with offline edits, renames, version history, and shared-folder permissions.',
        assumptions: ['5 million active users making 20 metadata changes/day: about 1,157 average writes/second.', 'Offline edits may conflict. Promise preservation of conflicting versions, not automatic merging of arbitrary binary files.'],
        capacity: 'Model metadata and blob traffic separately. Fixed-size chunks are simpler; content-defined chunking can avoid re-uploading most data after an insertion, at greater CPU and implementation cost.',
        api: 'POST /files/{id}/versions with base_version and chunk manifest\nGET /changes?cursor=\nPOST /files/{id}/rename\nDELETE /files/{id} with expected_version',
        dataModel: 'Stable file IDs; parent/name metadata; immutable file versions; chunk hash references; ordered per-account change log; tombstones and device cursors.',
        architecture: 'Device -> chunk store\nDevice -> version-commit API -> metadata transaction + change log -> other devices\nBackground worker -> orphan detection and safe chunk collection',
        approach: ['Upload missing chunks first, then atomically commit a version manifest against the expected base version. An uncommitted upload never becomes the current file.', 'When bases conflict, preserve both branches or create an explicit conflict copy. Keep identity separate from path so renames do not duplicate whole files.', 'Retain deletion tombstones until the supported offline window has elapsed. A device beyond that window must re-bootstrap rather than resurrect deleted content.'],
        tradeoffs: ['Long offline support requires longer tombstone retention.', 'Content-hash deduplication saves space but cross-tenant deduplication can reveal information and complicate encryption and ownership.'],
        pitfalls: ['Last-write-wins silently discarding offline edits.', 'Collecting chunks before all live snapshots and file versions release their references.'],
        followUpQuestion: 'How do you recover a version commit whose client timed out?',
        followUpAnswer: 'The client retries with the same operation ID. The metadata service returns the already committed version, or attempts the conditional transaction once. The client should query operation status before uploading a second unrelated version.',
        reference: 'https://learn.microsoft.com/en-us/azure/architecture/patterns/event-sourcing'
    });
    addDesign('ledger-case', 'Multi-Region Account Ledger', 'hld', ['Amazon', 'Oracle', 'Microsoft'], {
        problem: 'Design a durable transfer ledger with retries, auditability, and regional failover, without creating or losing money.',
        assumptions: ['Assume a single currency per transfer and integer minor units.', 'At 10,000 transfers/second, two-sided postings alone create 20,000 posting rows/second before indexes and replication.'],
        capacity: 'Partition carefully around transactional ownership. Peak write throughput, audit retention, and cross-partition transfers are separate capacity constraints.',
        api: 'POST /transfers with idempotency_key, source, destination, amount_minor, currency\nGET /transfers/{id}\nGET /accounts/{id}/balance?consistency=',
        dataModel: 'Transfer(idempotency_key UNIQUE, request_hash, status); immutable balanced Postings; Account balance/version; outbox events. Never reuse a key for a different payload.',
        architecture: 'API -> account-partition leader -> transaction: transfer + debit/credit postings + outbox\nDurable replication quorum -> response\nOutbox -> notifications and reconciliation',
        approach: ['Validate currency and balance invariants, then record both sides in one transaction when they share an ownership boundary. Every journal is balanced within a currency.', 'For transfers spanning independent transactional shards, explicitly choose distributed transactions or a durable reservation/settlement workflow. Do not present two independent writes as atomic.', 'Fence stale regional leaders before allowing a replacement to accept writes. Reconcile immutable ledger facts; derived balance caches are repairable views.'],
        tradeoffs: ['Strong write consistency can reduce availability during partitions.', 'A workflow can avoid a cross-shard transaction but requires pending states, reserved funds, compensation rules, and operational reconciliation.'],
        pitfalls: ['Floating-point money arithmetic.', 'Retrying with a fresh idempotency key after an ambiguous timeout.'],
        followUpQuestion: 'The transfer commits, but the API response is lost. Can retrying charge twice?',
        followUpAnswer: 'A retry with the same retained key and request hash returns the durable transfer result. A unique key constraint and transaction enforce the boundary. Key retention must cover the business retry horizon; this is not a blanket exactly-once guarantee for every external side effect.',
        reference: 'https://docs.stripe.com/api/idempotent_requests'
    });
    addDesign('snapshot-case', 'Cloud Volume Snapshots and Restore', 'hld', ['Microsoft', 'NVIDIA', 'Oracle'], {
        problem: 'Design incremental snapshots of replicated block volumes with fast restore and safe background garbage collection.',
        assumptions: ['Provide crash-consistent snapshots; application consistency additionally needs guest quiescing.', 'Illustrative extent size: 64 MiB. A 10 TiB volume has 163,840 extents; a 32-byte map entry gives about 5 MiB of base mapping metadata.'],
        capacity: 'Snapshot data growth follows changed extents, not total logical volume size. Budget separately for replication, copy-on-write amplification, restore reads, and replica rebuilds.',
        api: 'POST /volumes/{id}/snapshots with request_id\nPOST /volumes from snapshot_id\nDELETE /snapshots/{id}\nGET /operations/{id}',
        dataModel: 'Volume ownership epoch; replicated write sequence; immutable extent IDs; versioned mapping roots; snapshot root references; deletion generations.',
        architecture: 'Volume writer -> replicated write log + immutable extent versions\nSnapshot coordinator -> durable write frontier -> immutable mapping root\nRestore volume -> shared root -> copy-on-write updates\nCollector -> reachable-root scan -> delayed extent reclamation',
        approach: ['Fence ownership changes and establish a durable write frontier. Commit a snapshot root that references only data durable at that frontier.', 'Restore by creating a new mapping root referencing existing immutable extents. New writes allocate new versions, leaving snapshot data unchanged.', 'Garbage collection first identifies unreachable extents, then rechecks references or epochs after a grace period before deletion. Recovery favors leaked storage over lost live data.'],
        tradeoffs: ['Larger extents reduce metadata but amplify small-write copy-on-write costs.', 'Reference counting accelerates reclamation but requires crash-safe updates; tracing is simpler to reconcile but can be expensive.'],
        pitfalls: ['Calling a storage snapshot application-consistent without coordinating the application.', 'Deleting snapshot data still referenced by a restored volume.'],
        followUpQuestion: 'A replica rebuild competes with foreground reads. What would you do?',
        followUpAnswer: 'Use admission budgets and prioritized queues, measure foreground tail latency, and adapt rebuild throughput while respecting a durability-repair deadline. Keep recovery progress durable so preemption does not restart all work.',
        reference: 'https://learn.microsoft.com/en-us/azure/virtual-machines/managed-disks-overview'
    });
    addDesign('telemetry-case', 'Telemetry Ingestion Under Backpressure', 'hld', ['Netflix', 'Microsoft', 'NVIDIA'], {
        problem: 'Design a tenant-isolated telemetry pipeline that remains operable during traffic bursts and slow indexing.',
        assumptions: ['100,000 agents each send one 1 KB batch/second: about 100 MB/second or 8.64 TB/day before compression and replication.', 'Differentiate best-effort diagnostics from audit records whose durability contract forbids silent loss.'],
        capacity: 'Size a buffer by excess ingress rate times maximum tolerated recovery time. Also bound metric label cardinality, indexing CPU, and per-tenant disk use.',
        api: 'POST /ingest with tenant, agent_id, sequence and batch_id\nGET /query?time_range=&filters=\nGET /ingestion-status for lag and rejection counts',
        dataModel: 'Tenant partitions; immutable event batches with event and ingest timestamps; deduplication window; hot indexes; compressed archive; materialization watermark.',
        architecture: 'Agent bounded spool -> authenticated gateway -> replicated log -> index/aggregation workers\nLog -> object archive\nQuery API -> hot index + archived partitions',
        approach: ['Acknowledge after the promised durable boundary, not merely after placing data in a web-server buffer. Retries carry stable batch identities.', 'Apply per-tenant quotas and fairness. When overloaded, explicitly reject or sample permitted low-priority diagnostics; do not silently sample audit data.', 'Track event-time lateness and materialization watermarks. Replays must not double-count aggregations; use idempotent sinks or correction records.'],
        tradeoffs: ['Longer deduplication retention costs memory or storage.', 'Low-latency indexing is more expensive than archival analytics; separate their service levels.'],
        pitfalls: ['Unbounded agent spool filling the host disk.', 'High-cardinality labels overwhelming an otherwise healthy time-series store.'],
        followUpQuestion: 'Indexing is unavailable for an hour. Must ingestion stop?',
        followUpAnswer: 'It may continue only while the durable log has bounded headroom and the recovery budget permits it. Expose query lag, reduce optional work, and eventually reject excess traffic explicitly. A queue delays overload; it does not create infinite capacity.',
        reference: 'https://opentelemetry.io/docs/concepts/observability-primer/'
    });
    addDesign('billing-case', 'Subscription Billing and Reconciliation', 'hld', ['Oracle', 'Amazon', 'Microsoft'], {
        problem: 'Design periodic invoices, usage adjustments, provider charging, refunds, and recovery from duplicated callbacks.',
        assumptions: ['Assume one million monthly subscriptions, with billing time spread across the month rather than a midnight burst.', 'Invoices are immutable financial records; corrections create adjustments, not hidden rewrites.'],
        capacity: 'Average invoice rate is low compared with a synchronized month-boundary burst. Model provider quotas, retry storms, and backfill throughput independently.',
        api: 'POST /subscriptions\nPOST /usage-events with event_id\nPOST /invoices/{id}/finalize\nPOST /provider-webhooks\nGET /invoices/{id}',
        dataModel: 'Subscription version; usage-event ID; unique customer/period invoice; invoice lines in minor units; provider attempt ID; webhook ID; refund ledger.',
        architecture: 'Usage log + subscription snapshot -> invoice workers -> invoice DB + outbox\nCharge worker -> payment provider\nSigned webhook -> deduplicated event store -> invoice state machine\nReconciliation job -> provider statements versus ledger',
        approach: ['Freeze a versioned invoice only after the usage cutoff policy is satisfied. Late usage becomes a visible adjustment according to the customer contract.', 'Create a durable provider operation with a stable idempotency key before sending it. An ambiguous timeout leads to status lookup or reconciliation, not a new charge identity.', 'Verify webhook signatures and replay bounds, deduplicate event IDs, and allow only valid state transitions. Never trust a browser success redirect as payment verification.'],
        tradeoffs: ['Waiting longer for late usage improves invoice completeness but delays charging.', 'Asynchronous charging improves resilience but requires visible pending and action-required states.'],
        pitfalls: ['Charging from a scheduler without a unique invoice/period constraint.', 'Accepting duplicate or out-of-order callbacks as separate payments.'],
        followUpQuestion: 'A paid webhook arrives before the synchronous charge response. Which one wins?',
        followUpAnswer: 'Both refer to the same durable provider operation. Apply the authoritative terminal result once through the state machine, and treat the later matching response as confirmation. Conflicting results trigger provider lookup and reconciliation.',
        reference: 'https://docs.stripe.com/webhooks'
    });
    addDesign('inference-batching-case', 'LLM Serving with Continuous Batching', 'ai', ['NVIDIA', 'Google', 'Microsoft'], {
        problem: 'Design shared GPU inference with streaming, cancellation, tenant quotas, long prompts, and predictable time-to-first-token.',
        assumptions: ['Set separate service levels for queue time, first token, and inter-token latency.', 'Example GQA model: 32 layers, 8 KV heads, head dimension 128, two-byte KV values. These are interview assumptions, not a vendor specification.'],
        capacity: 'KV bytes/token = 2 * layers * KV_heads * head_dimension * bytes/value = 128 KiB. A 4,096-token sequence uses about 512 MiB; 32 such sequences use 16 GiB before weights, activations, allocator overhead, or fragmentation.',
        api: 'POST /generations with model_version, max_output_tokens and request_id\nGET /generations/{id}/events\nDELETE /generations/{id} for cancellation',
        dataModel: 'Request state and tenant budget; model/version placement; queue deadline; token usage records; cancellation generation; bounded streaming buffer.',
        architecture: 'Gateway -> token-aware admission -> fair queues -> scheduler -> GPU workers\nWorkers -> bounded token stream -> client\nUsage events -> durable billing/observability pipeline',
        approach: ['Reserve capacity using prompt length, output bounds, and model-specific memory. Separate or chunk large prefill work so it does not stall every decoding sequence.', 'Continuously admit and retire sequences within batches. Prefer tenant fairness and deadline-aware admission over raw batch size alone.', 'Propagate cancellation to the scheduler, release KV memory promptly, and cap buffers for slow clients. Pin a model version for each request and make fallback behavior explicit.'],
        tradeoffs: ['Larger batches improve throughput but can worsen tail latency.', 'Quantization and KV compression trade accuracy or compute for memory; benchmark the actual model and workload.'],
        pitfalls: ['Sizing solely from model weights while ignoring KV memory.', 'Automatically retrying a partially streamed response as if it were one continuous generation.'],
        followUpQuestion: 'What should the client see when a GPU fails after half an answer was streamed?',
        followUpAnswer: 'Terminate with an explicit incomplete/error event and a stable request ID. Offer an explicit restart or supported resumable protocol; do not silently append a different generation. Account for consumed tokens according to the published charging policy.',
        reference: 'https://docs.vllm.ai/en/latest/'
    });
    addDesign('rag-revocation-case', 'Enterprise RAG with Access Revocation', 'ai', ['Microsoft', 'Google', 'Amazon'], {
        problem: 'Design a document-grounded assistant where permission changes and deletions cannot be ignored by stale retrieval or response caches.',
        assumptions: ['200 tenants and 5 million chunks. Embeddings have 1,536 float32 dimensions.', 'Permission checks apply to every new answer. Already delivered text cannot be retroactively removed from a reader memory or screenshots.'],
        capacity: 'Raw vectors alone use 5,000,000 * 1,536 * 4 = 30.72 GB, before index graphs, replicas, text, and metadata. Retrieval fan-out and reranking also consume latency and compute.',
        api: 'POST /documents with source_version\nPOST /ask with tenant-scoped identity\nDELETE /documents/{id}\nPUT /documents/{id}/permissions',
        dataModel: 'Document/source version; chunk ID; tenant ID; embedding version; ACL version/epoch; deletion tombstone; answer citations to source versions.',
        architecture: 'Source -> parser/chunker -> versioned embeddings + text store\nQuery -> identity -> ACL-filtered lexical/vector retrieval -> authorization recheck -> rerank -> prompt -> LLM\nPermission events -> index/cache invalidation + authoritative policy store',
        approach: ['Apply tenant and permission constraints before retrieval and recheck retrieved documents before sending context to the model. Treat document text as untrusted evidence, never as tool authorization.', 'Include tenant, principal/policy version, source versions, model, and prompt version in cache eligibility. Bypass or invalidate caches when current authorization cannot be established.', 'Evaluate retrieval recall separately from grounded answer quality. Test cross-tenant isolation, revoked access, unanswerable queries, and poisoned instructions as explicit regression cases.'],
        tradeoffs: ['An authoritative policy check adds latency but prevents stale vector metadata from deciding access.', 'Chunk overlap can improve boundary recall while increasing storage and duplicate context. Measure instead of fixing one universal size.'],
        pitfalls: ['Filtering only after private passages have already entered the model prompt.', 'Assuming a citation proves a generated claim is supported.'],
        followUpQuestion: 'A document is deleted but an embedding index replica is stale. Can it enter a new answer?',
        followUpAnswer: 'Not if final context authorization consults the current document tombstone/version and fails closed. Remove text, vectors, caches, and retained traces according to retention policy, while immediately blocking the deleted source at the authoritative read boundary.',
        reference: 'https://learn.microsoft.com/en-us/azure/architecture/ai-ml/guide/rag/rag-solution-design-and-evaluation-guide'
    });
    addDesign('recommendation-case', 'Movie Recommendation Serving', 'ai', ['Netflix', 'Meta', 'Google'], {
        problem: 'Design a recommendation pipeline with candidate retrieval, personalized ranking, cold-start behavior, and trustworthy evaluation.',
        assumptions: ['Assume a 100 ms API target and 20,000 peak requests/second.', 'Budget, illustratively, 30 ms for retrieval, 20 ms for features, 30 ms for ranking, and 20 ms for other service work.'],
        capacity: 'Five million 128-dimensional float32 item vectors occupy 2.56 GB before index overhead and replicas. Rerank a bounded candidate set rather than scoring the entire catalogue for every request.',
        api: 'GET /recommendations?profile_id=&context=\nPOST /events with impression_id, item_id, position and event_time',
        dataModel: 'Impression/exposure log; interaction labels; point-in-time feature snapshots; item embeddings; model registry; experiment assignment; regional content eligibility.',
        architecture: 'Exposure + interaction events -> training datasets -> model registry\nRequest -> eligibility -> candidate sources -> online features -> rank -> diversity/rules -> response\nServing logs -> delayed-label evaluation and experiment analysis',
        approach: ['Define the target outcome and label window before choosing a model. Log exposures and positions so missing interactions are not confused with items that were never shown.', 'Use multiple candidate sources for personalized, popular, and fresh items. Apply availability and profile constraints, then rank a bounded set with versioned features.', 'Use temporal evaluation with no future features. Validate offline, then canary online with quality, latency, and user-experience guardrails and a rollback path.'],
        tradeoffs: ['Optimizing immediate clicks alone can harm long-term satisfaction and diversity.', 'Complex models may improve offline ranking while missing online latency or feature-availability requirements.'],
        pitfalls: ['Randomly splitting interactions so later user behavior leaks into training features.', 'Training only on clicked items without recording the exposure population.'],
        followUpQuestion: 'What do new users see before they have interaction history?',
        followUpAnswer: 'Use eligible regional popularity, lightweight explicit preferences, and controlled exploration. Avoid pretending an unobserved user has reliable personalized features. Evaluate the cold-start cohort separately from established users.',
        reference: 'https://developers.google.com/machine-learning/recommendation'
    });
    addDesign('reservation-state-case', 'Reservation Engine and Payment Races', 'lld', ['Amazon', 'Microsoft', 'Apple'], {
        problem: 'Model seats, expiring holds, payment confirmation, cancellation, and duplicate requests when several booking processes run concurrently.',
        assumptions: ['A seat can belong to at most one active hold or confirmed booking for an event.', 'A payment success arriving after hold expiry requires a deliberate compensation or reacquisition policy, not automatic confirmation.'],
        capacity: 'The critical bottleneck is contention on a specific seat/event, not total object count. Tests must include two concurrent claims and payment-versus-expiry races.',
        api: 'ReservationService.hold(event_id, seat_id, request_id)\nReservationService.confirm(hold_id, payment_id)\nReservationService.cancel(reservation_id)\nExpiryWorker.expire(hold_id, expected_version)',
        dataModel: 'Seat; Hold(owner, expires_at, version); Reservation(state, payment_id); immutable PaymentEvent. Inject Clock, Repository, PaymentGateway, and PricingPolicy interfaces.',
        architecture: 'AVAILABLE -> HELD -> CONFIRMED\nHELD -> EXPIRED or CANCELLED\nLate successful payment -> COMPENSATION_PENDING -> REFUNDED\nRepository enforces unique seat ownership and conditional state transitions',
        approach: ['Keep allocation and billing policy separate from state transitions. A repository transaction or compare-and-swap must atomically establish the active hold.', 'Confirmation checks ownership, current state, version, expiry, and a verified payment reference in one authoritative transition. An in-process mutex alone cannot protect multiple service instances.', 'Expiry changes only a matching HELD version. Duplicate confirmations return the existing result; an expired hold cannot become confirmed unless a new atomic allocation explicitly succeeds.'],
        tradeoffs: ['Long holds improve checkout convenience but reduce available inventory.', 'Allowing reacquisition after expiry may improve conversion, but it must compete fairly with other buyers and never oversell.'],
        pitfalls: ['Updating a seat and its reservation in separate uncoordinated writes.', 'Calling the payment provider inside a long-held database lock.'],
        followUpQuestion: 'How would you test expiry without waiting for wall-clock time?',
        followUpAnswer: 'Inject a controllable clock and a repository with version-aware transitions. Advance time past expiry, race confirmation against an expiry operation, and assert exactly one valid ownership outcome plus a durable refund/compensation record if required.',
        reference: 'https://www.hellointerview.com/learn/low-level-design/in-a-hurry/introduction'
    });
})();