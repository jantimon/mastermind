<% _.each(hints, function(color) { %>
<span class="hint peg <%= color %>" title="<%= hintText[color] %>"><%= hintText[color] %></span>
<% }); %>