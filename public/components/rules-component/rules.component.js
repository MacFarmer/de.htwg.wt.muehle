$(document).ready(function () {
    var rules = new Vue({
        el: '#rules'
    });
});

Vue.component('rules', {
    template: `
    <div id="rules">
            <div class="textarea justify">
                <h1 id="nine_header">Rules:</h1>
                <hr>
            </div>

            <p class="col-1"></p>
            <p class="ml-4 mr-4">
        <h3>The game proceeds in three phases:</h3>

        <ol type="1">
            <li>There are <b>2 players</b> in the game.</li>
            <li>The board consists of a grid of 3 squares one inside the other, with lines connecting the <b>24 intersections</b> on which pieces can be placed.</li>
            <li>Each player has <b>9 pieces</b>, called “men” of a given color.</li>
            <li>Each player tries to form a <b>“mill”</b>, which is 3 of their pieces in one row connected by the line. To form a mill, the pieces can be placed either horizontally or vertically, but not at at a 90 degree angle, and they must be connected by lines.</li>
            <li>The game begins when all pieces are off the board.</li>
            <li>Players decide who goes first either by agreement or by lot, such as toss of a coin.</li>
            <li>There are <b>3 phases</b> to the game: </li>
            <ol type="a">
                <li><b>Phase 1:</b> Placing the men onto the board</li>
                <ol type="i">
                    <li>The players take turns placing one piece at a time onto the board, onto the empty dots</li>
                    <li>During this phase each player tries to prevent the opponent from forming a mill. However, if a mill was formed anyway, then the player who formed a mill gets to remove one of the opponent’s pieces, of their choice, from the board. The piece removed has to be not in a mill itself. If all of the opponent’s pieces form a mill, then none of the opponent’s pieces can be removed.</li>
                    <li>Players can form more than one mill in a single move by strategically placing their pieces. If they form more than one mill, then they get to remove as many of the opponent’s pieces, as the number of mills that they formed.</li>
                    <li>The act of removing an opponent’s piece after forming a mill is called, “pounding”.</li>
                </ol>
                <li><b>Phase 2:</b> Moving the men on the board </li>
                <ol type="i">
                    <li>Once all of the pieces have been placed onto the board, the players begin moving their pieces, in alternating moves, one dot at a time to try to form mills in the same fashion as in the first phase.</li>
                    <li>In the second phase pieces can only move to an adjacent dot, and pieces cannot jump over each other or skip dots if more than one are available in a row.</li>
                    <li>Players can form more than one mill in a single move by strategically placing their pieces. If they form more than one mill, then they get to remove as many of the opponent’s pieces, as the number of mills that they formed.</li>
                    <li>A player is allowed to move a piece out of a mill and then moving it back on the next move to form the mill again. If this happens it is considered as if they formed a new mill and they get to remove one of the opponent’s pieces.</li>
                </ol>
                <li><b>Optional Phase 3:</b> Flying the men across the board </li>
                <ol type="i">
                    <li>When one of the players has been reduced down to 3 last pieces, phase 2 ends and phase 3 begins.</li>
                    <li>In phase 3, the limitation of moving only to an adjacent dot is removed, and both players can move their pieces to any available dot, even if that requires skipping dots or jumping over other pieces. Such movement is called “flying”.</li>
                    <li>Phase 3 is optional and is considered a variation of the game to give an advantage to the losing opponent once they only have one piece left. If the players agree not to play phase 3 then they continue playing phase 2 until the end of the game.</li>
                </ol>
            </ol>
            <li>The game ends when one of the players is reduced to two pieces, and cannot any longer form mills, or if a player has no legal moves to make, making their opponent the winner in either situation.</li>
        </ol>
        <br>
        </p>
        </div>
    </div>`
});