class GroupModel {
    constructor({ name, description, privacy, members = [], admins = [], groupAvatar = 'default_avatar.png', createdAt = new Date() }) {
        this.name = name;
        this.description = description;
        this.privacy = privacy;
        this.members = members;
        this.admins = admins;
        this.groupAvatar = groupAvatar;
        this.createdAt = createdAt;
    }

    isValidPrivacy() {
        return ['public', 'private', 'hidden'].includes(this.privacy);
    }

    addMember(member) {

        if (!this.members.includes(member)) {
            this.members.push(member);

        } else {
            throw new Error("Member already exists in the group.");
        }
    }

}

module.exports = GroupModel;