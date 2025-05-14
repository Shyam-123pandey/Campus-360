import CollaborationMeetingCard from './Group_discussion_card'

const GroupDiscussion = () => {
  return (
    <CollaborationMeetingCard
    title="AI Project Sync"
    description="Final discussion before demo submission"
    host="Prof. Sharma"
    time="2025-05-10T10:00:00Z"
    discordLink="https://discord.gg/abc123"
    durationMinutes={60}
    participants={[
      { name: "Alice", avatar: "./../../public/avatar1.jpg" },
      { name: "Bob", avatar: "./../../public/avatar2.jpg" },
    ]}
    attachmentLink="https://drive.google.com/file/d/xyz"
    recordingAvailable={true}
    isRecurring={true}
  />
  
  )
}

export default GroupDiscussion