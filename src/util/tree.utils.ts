import { IncentiveAnalyticsCardProps } from "../webparts/incentivesDashboard/components/incentive-analytics-card";

type ParticipantCompanyTreeNode = Omit<IncentiveAnalyticsCardProps, 'exibitionIndex'> & {
  children: ParticipantCompanyTreeNode[];
}

export const buildTree = (participantCompanyData: Omit<IncentiveAnalyticsCardProps, 'exibitionIndex'>[]) => {
  const map : {[id: string]: ParticipantCompanyTreeNode} = {};
  const roots : ParticipantCompanyTreeNode[] = [];

  participantCompanyData.forEach((item) => {
    map[item.companyId] = { ...item, children: [] };
  });

  participantCompanyData.forEach((item) => {
    if (!item.parentCompanyId) {
      roots.push(map[item.companyId]);
    } else {
      map[item.parentCompanyId].children.push(map[item.companyId]);
    }
  });

  return roots;
};

export const collectPaths = (node: ParticipantCompanyTreeNode, path: ParticipantCompanyTreeNode[] = [], paths: ParticipantCompanyTreeNode[][] = []) => {
  const newPath = [...path, node];
  if (node.children.length === 0) {
    paths.push(newPath);
  } else {
    node.children.forEach((child) => collectPaths(child, newPath, paths));
  }
  return paths;
};