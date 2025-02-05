import * as React from 'react';
import {Anchor} from '@twilio-paste/anchor';
import {Box} from '@twilio-paste/box';
import {Text} from '@twilio-paste/text';
import {Heading} from '@twilio-paste/heading';
import {Breadcrumb, BreadcrumbItem} from '../../breadcrumb';
import {SidebarCategoryRoutes} from '../../../constants';
import {P} from '../../Typography';
import {getHumanizedNameFromPackageName} from '../../../utils/RouteUtils';

const getCategoryNameFromRoute = (categoryRoute: string): string => {
  switch (categoryRoute) {
    case SidebarCategoryRoutes.COMPONENTS:
      return 'Components';
    case SidebarCategoryRoutes.UTILITIES:
      return 'Utilities';
    case SidebarCategoryRoutes.TOKENS:
      return 'Tokens';
    default:
      return 'Utilities';
  }
};

const ComponentHeaderBasic: React.FC<{
  name: string;
  categoryRoute: typeof SidebarCategoryRoutes[keyof typeof SidebarCategoryRoutes];
}> = ({name, categoryRoute}) => (
  <>
    <Breadcrumb>
      <BreadcrumbItem to="/">Home</BreadcrumbItem>
      <BreadcrumbItem to={categoryRoute}>{getCategoryNameFromRoute(categoryRoute)}</BreadcrumbItem>
    </Breadcrumb>
    <Heading as="h1" variant="heading10">
      {getHumanizedNameFromPackageName(name)}
    </Heading>
  </>
);

interface ComponentHeaderProps {
  children?: React.ReactElement;
  name: string;
  categoryRoute: typeof SidebarCategoryRoutes[keyof typeof SidebarCategoryRoutes];
  githubUrl: string;
  storybookUrl: string;
  data?: [
    {
      node: {
        name: string;
        category: string;
        description: string;
        status: string;
        sideEffects: boolean;
        version: string;
      };
    }
  ];
}

const PackageValue: React.FC<{}> = ({children}) => {
  return (
    <Text as="dd" display="inline-block">
      {children}
    </Text>
  );
};

const PackageLabel: React.FC<{}> = ({children}) => {
  return (
    <Text as="dt" display="inline-block" textColor="colorTextWeak" css={{width: '80px'}}>
      {children}
    </Text>
  );
};

const PackageInstallSnippet: React.FC<{}> = ({children}) => {
  return (
    <Text as="code" fontSize="fontSize30">
      {children}
    </Text>
  );
};

const ComponentHeader: React.FC<ComponentHeaderProps> = ({name, categoryRoute, githubUrl, storybookUrl, data}) => {
  if (data == null || data[0] == null || data[0].node == null) {
    return <ComponentHeaderBasic categoryRoute={categoryRoute} name={name} />;
  }
  const {description, status, name: packageName, version} = data[0].node;

  return (
    <>
      <ComponentHeaderBasic categoryRoute={categoryRoute} name={name} />
      <P variant="lead">{description}</P>
      <Box as="dl" marginBottom="space100">
        {status && (
          <Box marginBottom="space20">
            <PackageLabel>Status</PackageLabel>
            <PackageValue>{status}</PackageValue>
          </Box>
        )}
        <Box marginBottom="space20">
          <PackageLabel>Version</PackageLabel>
          <PackageValue>{version}</PackageValue>
        </Box>
        <Box marginBottom="space20">
          <PackageLabel>Sources</PackageLabel>
          <PackageValue>
            <Box display="inline" marginRight="space30">
              <Anchor href={githubUrl}>Github</Anchor>
            </Box>
            {storybookUrl != null ? <Anchor href={storybookUrl}>Storybook</Anchor> : null}
          </PackageValue>
        </Box>
        <Box marginBottom="space20">
          <PackageLabel>Install</PackageLabel>
          <PackageValue>
            <PackageInstallSnippet>yarn add {packageName}</PackageInstallSnippet>
          </PackageValue>
        </Box>
      </Box>
    </>
  );
};

export {ComponentHeader};
