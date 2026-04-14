export interface SliderData {
  // either images from .public (or other assets directory configured in angular.json) or external links (for example, image kept on s3)
  background: 'string',
  foreground: 'string',
  title: 'string',
  description: 'string',
  buttonText: 'string',
}
