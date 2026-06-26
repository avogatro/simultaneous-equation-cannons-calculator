xyz_pool = [2, 3, 4, 5]
fusion_pool = [1, 2, 3, 4, 5, 6]

# Calculate initial valid pairs (before any SEC activation)
initial_valid_pairs = set()
for x in xyz_pool:
    for f in fusion_pool:
        initial_valid_pairs.add((x + f, f + 2 * x))

markdown_content = "# All Possible SEC Combinations After 1st Activation given the same extra deck as below \n\n"
markdown_content += "Initial Extra Deck:\n"
markdown_content += "- Xyz Ranks: 2, 3, 4, 5\n"
markdown_content += "- Fusion Levels: 1, 2, 3, 4, 5, 6\n\n"
markdown_content += "use gen_sec.py to generate for other Extra Deck combinations\n\n"
markdown_content += "*Assumption: You run exactly 1 copy of each in your Extra Deck, so the cards banished during the first SEC are no longer available to send for the second SEC.*\n\n"

markdown_content += "### Legend:\n"
markdown_content += "- 🌟 : **Freebie Level** (Opponent monster equals $X_1 + F_1$. Any valid $T$ resolves the card because you just return your previously banished monsters!)\n"
markdown_content += "- ✅ : **Valid State** (Standard successful resolution)\n"
markdown_content += "- 🆕 : **Newly Possible State** (This combination was impossible at the start, but is now possible because you can mix-and-match newly banished cards with previously banished ones!).\n"
markdown_content += "- ❌ : **Lost State** (This $(L, T)$ combination was solvable at the start of the duel, but became impossible because you banished the necessary cards).\n"
markdown_content += "- (Empty) : Impossible state (Was impossible at the start, and is still impossible).\n\n"

# Define fixed axes ranges for consistent tables
t_min, t_max = min(fusion_pool) + 2 * min(xyz_pool), max(fusion_pool) + 2 * max(xyz_pool)
l_min, l_max = min(fusion_pool) + min(xyz_pool), max(fusion_pool) + max(xyz_pool)

for x1 in xyz_pool:
    for f1 in fusion_pool:
        markdown_content += f"## 1st SEC: Sent Xyz {x1} and Fusion {f1}\n\n"
        
        rem_xyz = [x for x in xyz_pool if x != x1]
        rem_fusion = [f for f in fusion_pool if f != f1]
        
        valid_pairs = set()
        
        for x2 in rem_xyz:
            for f2 in rem_fusion:
                t = f2 + 2 * x2
                possible_l = [x1 + f1, x1 + f2, x2 + f1, x2 + f2]
                for l in possible_l:
                    valid_pairs.add((l, t))
        
        # Build Markdown Table
        header = "| L \\ T | " + " | ".join([str(t) for t in range(t_min, t_max + 1)]) + " |"
        separator = "| :--- | " + " | ".join([":---:" for _ in range(t_min, t_max + 1)]) + " |"
        
        markdown_content += header + "\n"
        markdown_content += separator + "\n"
        
        freebie_level = x1 + f1
        
        for l in range(l_min, l_max + 1):
            row = f"| **{l}** | "
            cells = []
            for t in range(t_min, t_max + 1):
                if (l, t) in valid_pairs:
                    if l == freebie_level:
                        cells.append("🌟")
                    elif (l, t) not in initial_valid_pairs:
                        cells.append("🆕")
                    else:
                        cells.append("✅")
                else:
                    if (l, t) in initial_valid_pairs:
                        cells.append("❌")
                    else:
                        cells.append(" ")
            row += " | ".join(cells) + " |"
            markdown_content += row + "\n"
            
        markdown_content += "\n---\n\n"

with open("D:\\simultaneous-equation-cannons-calculator\\combinations_after_first_sec.md", "w", encoding="utf-8") as f:
    f.write(markdown_content)
print("File regenerated with freebie and lost state markers.")
