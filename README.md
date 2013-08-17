mastermind
==========

**Gameplay and rules**

The game is played using:

+ a decoding board, with a shield at one end covering a row of four large holes, and twelve (or ten, or eight) additional rows containing four large holes next to a set of four small holes;

+ code pegs of six (or more; see Variations below) different colors, with round heads, which will be placed in the large holes on the board; and  

+ key pegs, some colored or black, some white, which are flat-headed and smaller than the code pegs; they will be placed in the small holes on the board.

The cpu chooses a pattern of four code pegs. Duplicates are allowed, so the cpu could even choose four code pegs of the same color. The chosen pattern is placed in the four holes covered by the shield, not visible to the codebreaker.
The player tries to guess the pattern, in both order and color, within eight turns. Each guess is made by placing a row of code pegs on the decoding board. Once placed, the cpu provides feedback by placing from zero to four key pegs in the small holes of the row with the guess. A colored or black key peg is placed for each code peg from the guess which is correct in both color and position. A white key peg indicates the existence of a correct color code peg placed in the wrong position.

[Play the game](http://jantimon.github.io/mastermind/) or take a look at the [Jasmine tests](http://jantimon.github.io/mastermind/test.html)
