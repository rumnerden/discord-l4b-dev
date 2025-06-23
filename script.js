// Discord Widget JavaScript
class DiscordWidget {
  constructor(guildId, containerId) {
    this.guildId = guildId;
    this.container = document.getElementById(containerId);
    this.apiUrl = `https://discord.com/api/guilds/${guildId}/widget.json`;
  }

  async fetchGuildData() {
    try {
      const response = await fetch(this.apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching Discord data:', error);
      throw error;
    }
  }

  getStatusClass(status) {
    switch (status) {
      case 'online': return 'status-online';
      case 'idle': return 'status-idle';
      case 'dnd': return 'status-dnd';
      default: return 'status-offline';
    }
  }

  createMemberAvatar(member) {
    const avatarDiv = document.createElement('div');
    avatarDiv.className = 'member-avatar';
    avatarDiv.title = member.username;

    const img = document.createElement('img');
    img.src = member.avatar_url;
    img.alt = member.username;
    img.onerror = () => {
      // Fallback to default Discord avatar if image fails to load
      img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTYiIGZpbGw9IiM3Mjg5ZGEiLz4KPHN2ZyB4PSI4IiB5PSI4IiB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSI+CjxwYXRoIGQ9Ik04IDJDNi4zNDMgMiA1IDMuMzQzIDUgNUM1IDYuNjU3IDYuMzQzIDggOCA4QzkuNjU3IDggMTEgNi42NTcgMTEgNUMxMSAzLjM0MyA5LjY1NyAyIDggMloiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik04IDEwQzUuNzkgMTAgNCA5LjIxIDQgOC4yNUM0IDcuMjkgNS43OSA2LjUgOCA2LjVDMTAuMjEgNi41IDEyIDcuMjkgMTIgOC4yNUMxMiA5LjIxIDEwLjIxIDEwIDggMTBaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4KPC9zdmc+';
    };

    const statusIndicator = document.createElement('div');
    statusIndicator.className = `member-status ${this.getStatusClass(member.status)}`;

    avatarDiv.appendChild(img);
    avatarDiv.appendChild(statusIndicator);

    return avatarDiv;
  }

  renderWidget(data) {
    const onlineMembers = data.members.filter(member => member.status === 'online');
    const totalMembers = data.presence_count;

    this.container.innerHTML = `
      <div class="logo-container">
        <img src="logo.svg" alt="Rumnerden Logo" class="logo">
      </div>
      
      <!--div class="discord-header">
        <div class="discord-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
          </svg>
        </div>
        <div class="discord-server-info">
          <h2>${data.name}</h2>
          <div class="server-id">ID: ${data.id}</div>
        </div>
      </div-->

      <div class="discord-stats">
        <div class="stat-item">
          <span class="stat-number">${onlineMembers.length}</span>
          <div class="stat-label">Online</div>
        </div>
        <div class="stat-item">
          <span class="stat-number">${totalMembers}</span>
          <div class="stat-label">Members</div>
        </div>
      </div>

      <div class="discord-members">
        <div class="members-title">Online Members</div>
        <div class="members-list" id="members-list">
        </div>
      </div>

      <a href="${data.instant_invite}" target="_blank" class="discord-invite-button">
        Join Discord Server
      </a>
    `;

    // Add member avatars
    const membersList = document.getElementById('members-list');
    onlineMembers.slice(0, 12).forEach(member => { // Limit to 12 members for display
      membersList.appendChild(this.createMemberAvatar(member));
    });

    // Add "and more" indicator if there are more online members
    if (onlineMembers.length > 12) {
      const moreIndicator = document.createElement('div');
      moreIndicator.className = 'member-avatar';
      moreIndicator.style.background = 'rgba(255, 255, 255, 0.2)';
      moreIndicator.style.display = 'flex';
      moreIndicator.style.alignItems = 'center';
      moreIndicator.style.justifyContent = 'center';
      moreIndicator.style.fontSize = '12px';
      moreIndicator.style.fontWeight = '600';
      moreIndicator.textContent = `+${onlineMembers.length - 12}`;
      moreIndicator.title = `${onlineMembers.length - 12} more online members`;
      membersList.appendChild(moreIndicator);
    }
  }

  showError(message) {
    this.container.innerHTML = `
      <div class="error">
        <h3>Failed to load Discord server</h3>
        <p>${message}</p>
        <p>Please check if the server widget is enabled.</p>
      </div>
    `;
  }

  async init() {
    try {
      const data = await this.fetchGuildData();
      this.renderWidget(data);
    } catch (error) {
      this.showError(error.message);
    }
  }
}

// Initialize the widget when the page loads
document.addEventListener('DOMContentLoaded', () => {
  const widget = new DiscordWidget('1197349028904570940', 'discord-widget');
  widget.init();
});

// Auto-refresh the widget every 5 minutes
setInterval(() => {
  const widget = new DiscordWidget('1197349028904570940', 'discord-widget');
  widget.init();
}, 5 * 60 * 1000);
