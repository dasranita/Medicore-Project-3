const db = require('./db');
async function audit(actorId, action, resource, resourceId, requestId) {
  return db.auditLog.create({ data: { actorId, action, resource, resourceId, requestId } });
}
module.exports = audit;
